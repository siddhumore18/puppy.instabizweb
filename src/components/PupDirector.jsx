import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PupBuddy from "./PupBuddy";
import { PAW_PATH } from "./PawIcon";

const PRINT_COUNT = 24;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function PupDirector() {
  const { pathname } = useLocation();
  const layerRef = useRef(null);
  const actorRef = useRef(null);
  const printsRef = useRef(null);
  const [pose, setPose] = useState("peek");
  const [facing, setFacing] = useState("right");
  const [walkPhase, setWalkPhase] = useState(0);
  const [behind, setBehind] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId = 0;
    let stops = [];

    // Smoothly interpolated state
    const curState = {
      x: 0,
      y: 0,
      scale: 1,
      initialized: false,
      lastPrintX: 0,
      lastPrintY: 0,
      printIdx: 0,
      walkPhase: 0,
    };

    const printsState = Array.from({ length: PRINT_COUNT }, () => ({
      x: 0,
      y: 0,
      rot: 0,
      bornAt: 0,
    }));

    const measureStops = () => {
      const els = Array.from(document.querySelectorAll("[data-pup-stop]")).filter(
        (el) => el.getClientRects().length > 0
      );
      stops = els.map((el) => {
        const rect = el.getBoundingClientRect();
        const docY = rect.top + window.scrollY + rect.height * 0.5;
        const docX = rect.left + rect.width * 0.5;
        return {
          el,
          docX,
          docY,
          width: rect.width,
          height: rect.height,
          pose: el.dataset.pose || "sit",
          facing: el.dataset.facing || "right",
          behind: el.dataset.behind === "true",
          triggerY: docY - window.innerHeight * 0.52,
        };
      });

      els.forEach((el) => {
        el.dataset.pupControlled = "true";
      });

      if (stops.length > 0) setActive(true);
    };

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);
      if (!stops.length || !actorRef.current || !layerRef.current) return;

      const sy = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;

      // If currently inside the pinned Meet the pups treadmill, let its floor-running Teddy take over
      const treadmillStop = stops.find((s) => s.el.dataset.act === "treadmill");
      if (treadmillStop) {
        const pinRange = treadmillStop.el.closest("[data-pin-range]");
        const pinRect = pinRange?.getBoundingClientRect();
        const inPinnedMeet = pinRect && pinRect.top <= 4 && pinRect.bottom >= vh - 4;
        if (inPinnedMeet) {
          treadmillStop.el.dataset.pupControlled = "false";
          layerRef.current.hidden = true;
          return;
        } else {
          treadmillStop.el.dataset.pupControlled = "true";
        }
      }

      const lastStop = stops[stops.length - 1];
      if (lastStop && lastStop.el.dataset.act === "basket" && sy >= maxScroll - 40) {
        lastStop.el.dataset.pupControlled = "false";
        layerRef.current.hidden = true;
      } else {
        if (lastStop && lastStop.el.dataset.act === "basket") {
          lastStop.el.dataset.pupControlled = "true";
        }
        layerRef.current.hidden = false;
      }

      // Find current segment
      let i = 0;
      while (i < stops.length - 1 && sy > stops[i + 1].triggerY) {
        i++;
      }
      const cur = stops[i];
      const next = stops[Math.min(i + 1, stops.length - 1)];

      let targetX = cur.docX;
      let targetY = cur.docY - sy;
      let targetPose = cur.pose;
      let targetFacing = cur.facing;
      let targetBehind = cur.behind;
      let isTraveling = false;

      if (cur !== next) {
        const span = Math.max(1, next.triggerY - cur.triggerY);
        const rawT = Math.max(0, Math.min(1, (sy - cur.triggerY) / span));
        if (rawT > 0.14 && rawT < 0.88) {
          isTraveling = true;
          const segT = easeInOut((rawT - 0.14) / 0.74);
          targetX = lerp(cur.docX, next.docX, segT);
          const rawY = lerp(cur.docY - sy, next.docY - sy, segT);
          const arcBias = Math.sin(segT * Math.PI);
          const blendedY = lerp(rawY, vh * 0.48, arcBias * 0.55);
          targetY = Math.max(vh * 0.22, Math.min(vh * 0.68, blendedY));
          targetPose = "walk";
          targetFacing = next.docX >= cur.docX ? "right" : "left";
          targetBehind = false;
        } else if (rawT >= 0.88) {
          targetX = next.docX;
          targetY = next.docY - sy;
          targetPose = next.pose;
          targetFacing = next.facing;
          targetBehind = next.behind;
        }
      }

      const targetScale = Math.max(0.58, Math.min(1, cur.width / 220));

      if (!curState.initialized) {
        curState.x = targetX;
        curState.y = targetY;
        curState.scale = targetScale;
        curState.lastPrintX = targetX;
        curState.lastPrintY = targetY + sy;
        curState.initialized = true;
      } else {
        // Smooth spring-like damping for consistent, calm movement
        curState.x = lerp(curState.x, targetX, 0.1);
        curState.y = lerp(curState.y, targetY, 0.1);
        curState.scale = lerp(curState.scale, targetScale, 0.1);
      }

      const dx = targetX - curState.x;
      const dy = targetY - curState.y;
      const speed = Math.hypot(dx, dy);

      if (isTraveling || speed > 2.5) {
        curState.walkPhase += Math.min(0.16, 0.08 + speed * 0.003);
        setWalkPhase(curState.walkPhase);
        setPose(speed > 3 ? "walk" : targetPose);
      } else {
        setPose(targetPose);
      }
      setFacing(targetFacing);
      setBehind(targetBehind);

      const actorW = 220 * curState.scale;
      const actorH = 176 * curState.scale;
      actorRef.current.style.transform = `translate3d(${(curState.x - actorW / 2).toFixed(1)}px, ${(
        curState.y -
        actorH / 2
      ).toFixed(1)}px, 0) scale(${curState.scale.toFixed(3)})`;
      actorRef.current.style.transformOrigin = "top left";

      // Drop pawprints along the path as Teddy walks, fading out after ~1.3s
      const docPrintY = curState.y + sy + 42 * curState.scale;
      const distSinceLastPrint = Math.hypot(
        curState.x - curState.lastPrintX,
        docPrintY - curState.lastPrintY
      );

      if (distSinceLastPrint > 44 && (isTraveling || speed > 3)) {
        const idx = curState.printIdx % PRINT_COUNT;
        const sideOffset = curState.printIdx % 2 === 0 ? -12 : 12;
        printsState[idx] = {
          x: curState.x + sideOffset,
          y: docPrintY,
          rot: curState.printIdx % 2 === 0 ? -14 : 14,
          bornAt: now,
        };
        curState.lastPrintX = curState.x;
        curState.lastPrintY = docPrintY;
        curState.printIdx++;
      }

      if (printsRef.current) {
        const svgs = printsRef.current.children;
        for (let p = 0; p < svgs.length; p++) {
          const st = printsState[p];
          const svg = svgs[p];
          if (!st.bornAt) {
            svg.style.opacity = "0";
            continue;
          }
          const age = now - st.bornAt;
          const life = 1400;
          if (age >= life) {
            svg.style.opacity = "0";
          } else {
            const fade = age < 350 ? 0.42 : 0.42 * (1 - (age - 350) / (life - 350));
            const screenY = st.y - sy;
            svg.style.opacity = fade.toFixed(3);
            svg.style.transform = `translate3d(${st.x.toFixed(1)}px, ${screenY.toFixed(
              1
            )}px, 0) rotate(${st.rot}deg)`;
          }
        }
      }
    };

    const timer = setTimeout(() => {
      measureStops();
      rafId = requestAnimationFrame(tick);
    }, 150);

    const onResize = () => measureStops();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return (
    <>
      <div className="pup-probe" aria-hidden="true" />
      <div ref={printsRef} className="pup-prints" aria-hidden="true">
        {Array.from({ length: PRINT_COUNT }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 64 64"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "18px",
              height: "18px",
              color: "#a24a1a",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <path d={PAW_PATH} fill="currentColor" />
          </svg>
        ))}
      </div>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pup-layer"
        hidden={!active}
        data-front={behind ? "false" : "true"}
      >
        <div ref={actorRef} className="pup-actor">
          <div className="pup-actor__body">
            <PupBuddy pose={pose} facing={facing} walkPhase={walkPhase} />
          </div>
          <span className="pup-bubble-at">
            <span className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
