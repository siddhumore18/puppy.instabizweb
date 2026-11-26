import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PupBuddy from "../PupBuddy";

// Cubic bezier helper for Korea (40, 250) -> Dubai (620, 168)
function cubicBezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  const dx =
    3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy =
    3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, angle };
}

export default function TwoWaysSection() {
  const flightRef = useRef(null);
  const [planePos, setPlanePos] = useState({ x: 410, y: 70, angle: 6 });

  useEffect(() => {
    let rafId = 0;

    const updatePlane = () => {
      const el = flightRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Map scroll visibility from bottom of viewport to top
      const raw = (vh - rect.top) / (vh + rect.height);
      const t = Math.max(0.18, Math.min(0.86, raw * 0.85 + 0.1));
      const pos = cubicBezier([40, 250], [170, 40], [470, 20], [620, 168], t);
      setPlanePos(pos);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePlane);
    };

    updatePlane();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div data-section="paths">
      <section
        aria-labelledby="paths-title"
        className="tp-scene tp-paths"
        data-pup-scene="true"
        data-tone="light"
        style={{ "--sky-top": "#fbe3b4", "--sky-bottom": "#f7d18d" }}
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <h2 className="tp-paths__title font-plush text-huge" id="paths-title">
            Two ways to meet your puppy
          </h2>

          <div className="tp-fork">
            <div aria-hidden="true" className="tp-fork__post" />

            <article aria-labelledby="way-local" className="tp-way tp-way--left">
              <h3 className="tp-sign tp-sign--left font-plush" id="way-local">
                Puppies in Dubai
              </h3>
              <div className="tp-way__scene" data-pup-look="true">
                <svg aria-hidden="true" className="tp-way__skyline" viewBox="0 0 300 120">
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.6"
                  />
                </svg>
                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <img
                      alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                      src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "54.3% 48.3%",
                      }}
                    />
                  </span>
                  <figcaption className="font-scrawl">In our showroom</figcaption>
                </figure>
              </div>
              <p className="tp-way__text">
                See them, love them, take them home. Come meet our locally available puppies before
                you decide.
              </p>
              <Link className="btn btn-primary" to="/puppies?origin=local">
                Meet local puppies
              </Link>
            </article>

            <article aria-labelledby="way-imported" className="tp-way tp-way--right">
              <h3 className="tp-sign tp-sign--right font-plush" id="way-imported">
                Imported for you
              </h3>
              <div className="tp-way__scene" data-pup-look="true">
                <div ref={flightRef} className="tp-flight">
                  <svg
                    aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
                    role="img"
                    viewBox="0 0 660 300"
                  >
                    <defs>
                      <clipPath id="plane-porthole-clip">
                        <circle r="25" />
                      </clipPath>
                    </defs>
                    <path className="tp-flight__route" d="M40 250 C 170 40, 470 20, 620 168" />
                    <circle className="tp-flight__dot" cx="40" cy="250" r="7" />
                    <circle className="tp-flight__dot" cx="620" cy="168" r="7" />
                    <text className="tp-flight__label" textAnchor="middle" x="40" y="284">
                      Korea
                    </text>
                    <text className="tp-flight__label" textAnchor="middle" x="620" y="202">
                      Dubai
                    </text>

                    <g
                      className="tp-flight__plane"
                      transform={`translate(${planePos.x.toFixed(1)} ${planePos.y.toFixed(1)}) rotate(${(
                        planePos.angle * 0.45
                      ).toFixed(1)})`}
                    >
                      <g transform="translate(-126 -78)">
                        <path className="tp-flight__wing" d="M28 60 L8 26 L34 26 L60 54 Z" />
                        <path
                          className="tp-flight__wing tp-flight__wing--far"
                          d="M108 112 L142 156 L172 156 L158 112 Z"
                        />
                        <path
                          className="tp-flight__body"
                          d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                        />
                        <path className="tp-flight__wing" d="M104 44 L138 2 L168 2 L154 44 Z" />
                        <path className="tp-flight__line" d="M206 64 C215 67 221 73 224 80" />
                      </g>
                      <g transform="translate(10 2)">
                        <image
                          clipPath="url(#plane-porthole-clip)"
                          height="50"
                          href="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                          preserveAspectRatio="xMidYMid slice"
                          width="50"
                          x="-25"
                          y="-25"
                        />
                        <circle className="tp-flight__porthole" r="25" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <p className="tp-way__text">
                Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most
                reputable breeders and let us handle the import.
              </p>
              <Link className="btn btn-primary" to="/puppies?origin=imported">
                See imported puppies
              </Link>
            </article>

            <div
              className="pup-stop tp-fork__teddy"
              data-facing="right"
              data-pose="sit"
              data-pup-stop="true"
            >
              <PupBuddy pose="sit" facing="right" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
