import { useEffect, useRef } from "react";
import { PAW_PATH } from "./PawIcon";

export default function CursorPawTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pawPath = new Path2D(PAW_PATH);
    const prints = [];
    let lastX = null;
    let lastY = null;
    let stepSide = 1;
    let rafId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawnPrint = (x, y, angleRad, scale = 0.28) => {
      prints.push({
        x,
        y,
        angle: angleRad + Math.PI / 2,
        scale,
        bornAt: performance.now(),
        life: 850,
      });
      if (prints.length > 28) prints.shift();
    };

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastX === null) {
        lastX = x;
        lastY = y;
        return;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist >= 44) {
        const angle = Math.atan2(dy, dx);
        const perpX = -Math.sin(angle) * 7 * stepSide;
        const perpY = Math.cos(angle) * 7 * stepSide;
        spawnPrint(x + perpX, y + perpY, angle);
        stepSide *= -1;
        lastX = x;
        lastY = y;
      }
    };

    const onDown = (e) => {
      spawnPrint(e.clientX, e.clientY, -Math.PI / 2 - 0.15, 0.34);
    };

    const render = (now) => {
      rafId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = prints.length - 1; i >= 0; i--) {
        const p = prints[i];
        const age = now - p.bornAt;
        if (age >= p.life) {
          prints.splice(i, 1);
          continue;
        }
        const t = age / p.life;
        const alpha = 0.36 * (1 - t) * (1 - t);
        const s = p.scale * (0.92 + 0.12 * (1 - t));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(s, s);
        ctx.translate(-32, -32);
        ctx.fillStyle = `rgba(162, 74, 26, ${alpha.toFixed(3)})`;
        ctx.fill(pawPath);
        ctx.restore();
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] size-full"
    />
  );
}
