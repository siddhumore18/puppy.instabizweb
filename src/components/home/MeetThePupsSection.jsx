import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_DOORS } from "../../data/puppies";
import PawIcon, { PAW_PATH } from "../PawIcon";
import PupBuddy from "../PupBuddy";

export default function MeetThePupsSection() {
  const doors = HOME_DOORS.filter((p) => Boolean(p.cover));
  const pinRangeRef = useRef(null);
  const hallRef = useRef(null);
  const trackRef = useRef(null);
  const teddyRef = useRef(null);

  const [facing, setFacing] = useState("right");
  const [openIndex, setOpenIndex] = useState(2);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [walkPhase, setWalkPhase] = useState(0);
  const [floorPrints, setFloorPrints] = useState([]);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const range = pinRangeRef.current;
    const hall = hallRef.current;
    const track = trackRef.current;
    if (!range || !hall || !track) return;

    if (!isDesktop) {
      range.style.height = "";
      track.style.transform = "";
      if (teddyRef.current) teddyRef.current.style.transform = "";
      return;
    }

    let rafId = 0;
    let maxTravel = 0;
    let lastProgress = 0;
    let lastOpenIdx = 2;
    let lastFacing = "right";
    let lastPrintVw = -10;
    let printCounter = 0;

    const measure = () => {
      maxTravel = Math.max(0, track.scrollWidth - hall.clientWidth + 96);
      range.style.height = `${window.innerHeight + maxTravel}px`;
    };

    const sync = () => {
      if (!range || !hall || !track) return;
      if (maxTravel === 0) measure();

      const rect = range.getBoundingClientRect();
      const scrollable = Math.max(1, range.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      range.style.setProperty("--pinned", progress.toFixed(4));
      track.style.transform = `translate3d(${(-progress * maxTravel).toFixed(2)}px, 0, 0)`;

      if (teddyRef.current) {
        const floorRunPx = progress * (hall.clientWidth * 0.74);
        teddyRef.current.style.transform = `translate3d(${floorRunPx.toFixed(2)}px, 0, 0)`;
      }

      const diff = progress - lastProgress;
      if (Math.abs(diff) > 0.0005) {
        lastProgress = progress;
        const nextFacing = diff >= 0 ? "right" : "left";
        if (nextFacing !== lastFacing) {
          lastFacing = nextFacing;
          setFacing(nextFacing);
        }
        setWalkPhase(progress * 34);

        const vwPos = 6 + progress * 74;
        if (Math.abs(vwPos - lastPrintVw) >= 3.0) {
          lastPrintVw = vwPos;
          const id = ++printCounter;
          const step = id % 2 === 0 ? -1 : 1;
          setFloorPrints((prev) => [...prev.slice(-14), { id, vw: vwPos, step }]);
          setTimeout(() => {
            setFloorPrints((cur) => cur.filter((p) => p.id !== id));
          }, 1250);
        }
      }

      const nextOpen = Math.floor(progress * doors.length) + 2;
      if (nextOpen !== lastOpenIdx) {
        lastOpenIdx = nextOpen;
        setOpenIndex(nextOpen);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(sync);
    };

    const t = setTimeout(() => {
      measure();
      sync();
    }, 80);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      sync();
    });
    window.addEventListener("load", () => {
      measure();
      sync();
    });

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isDesktop, doors.length]);

  return (
    <div data-section="meet">
      <section
        aria-labelledby="meet-title"
        className="tp-scene tp-meet"
        data-pinned={isDesktop ? "true" : undefined}
        data-pup-scene="true"
        data-tone="light"
        style={{ "--sky-top": "#fff1d8", "--sky-bottom": "#fbe3b4" }}
      >
        <div ref={pinRangeRef} data-pin-range="true" style={{ "--pinned": 0 }}>
          <div className="tp-meet__stage">
            <header className="tp-meet__head gutter">
              <div>
                <h2 className="font-plush text-huge" id="meet-title">
                  Meet the pups
                </h2>
                <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                  Real puppies, real photos, looking for their families right now.
                </p>
              </div>
              <Link className="btn btn-primary shrink-0" to="/puppies">
                See all available puppies
              </Link>
            </header>

            <div ref={hallRef} className="tp-meet__hall">
              <ol
                ref={trackRef}
                aria-label="Puppies looking for a family"
                className="tp-meet__track"
                data-treadmill="true"
                style={{ transition: "none" }}
              >
                {doors.map((pup, idx) => {
                  const isOpen = !isDesktop || idx <= openIndex || hoveredIdx === idx;
                  return (
                    <li
                      key={pup.slug}
                      className="tp-door"
                      data-open={isOpen ? "true" : "false"}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <Link
                        className="tp-door__link"
                        to={`/puppies/${pup.slug}`}
                        style={{ "--door": pup.doorColor }}
                      >
                        <span className="tp-door__plate">
                          <span className="font-plush tp-door__name">{pup.displayName}</span>
                          <span className="tp-door__meta">{pup.meta}</span>
                        </span>
                        <span className="tp-door__frame">
                          <span className="tp-door__room">
                            <img
                              alt={pup.displayName}
                              src={pup.cover}
                              loading="lazy"
                              style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </span>
                          <span aria-hidden="true" className="tp-door__way">
                            <span className="tp-door__leaf">
                              <PawIcon className="tp-door__peephole" />
                              <span className="tp-door__knob" />
                            </span>
                          </span>
                          <span className="tp-door__tag font-scrawl">{pup.tag}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}

                <li className="tp-door tp-door--all" data-open="true">
                  <Link className="tp-door__link" to="/puppies">
                    <span className="tp-door__frame tp-door__frame--all">
                      <span className="font-plush tp-door__all">Meet them all</span>
                    </span>
                  </Link>
                </li>
              </ol>

              <div aria-hidden="true" className="tp-meet__floor">
                {isDesktop &&
                  floorPrints.map((fp) => (
                    <svg
                      key={fp.id}
                      viewBox="0 0 64 64"
                      style={{
                        position: "absolute",
                        left: `${fp.vw}%`,
                        top: fp.step > 0 ? "22%" : "42%",
                        width: "18px",
                        height: "18px",
                        color: "#8e3f15",
                        opacity: 0.45,
                        transform: `rotate(${fp.step > 0 ? 78 : 102}deg)`,
                        transition: "opacity 1.2s ease",
                        pointerEvents: "none",
                      }}
                    >
                      <path d={PAW_PATH} fill="currentColor" />
                    </svg>
                  ))}
              </div>

              <div
                ref={teddyRef}
                className="pup-stop tp-meet__teddy"
                data-act={isDesktop ? "treadmill" : undefined}
                data-facing={facing}
                data-pose={isDesktop ? "walk" : "sit"}
                data-pup-stop="true"
                style={isDesktop ? { left: "4vw", zIndex: 12, transition: "none" } : undefined}
              >
                <PupBuddy
                  pose={isDesktop ? "walk" : "sit"}
                  facing={facing}
                  walkPhase={walkPhase}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
