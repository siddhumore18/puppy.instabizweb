import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_PUPPIES, HOME_DOORS } from "../../data/puppies";
import PupBuddy from "../PupBuddy";
import { WA_LINK } from "../Header";

const SEAT_LAYOUT = [
  { "--x": "9%", "--w": "8.6rem", "--peek": "0.62", "--tilt": "-5deg", "--i": 0 },
  { "--x": "22.5%", "--w": "10.4rem", "--peek": "0.8", "--tilt": "3deg", "--i": 1 },
  { "--x": "35%", "--w": "9.2rem", "--peek": "0.7", "--tilt": "-2deg", "--i": 2 },
  { "--x": "65%", "--w": "9.4rem", "--peek": "0.74", "--tilt": "3deg", "--i": 3 },
  { "--x": "77.5%", "--w": "10.6rem", "--peek": "0.82", "--tilt": "-3deg", "--i": 4 },
  { "--x": "91%", "--w": "8.4rem", "--peek": "0.6", "--tilt": "4deg", "--i": 5 },
];

export default function HeroSection() {
  const pool = useMemo(() => {
    const bySlug = new Map();
    HOME_DOORS.filter((p) => Boolean(p.cover)).forEach((p) =>
      bySlug.set(p.slug, {
        slug: p.slug,
        name: p.displayName,
        img: p.cover,
        objPos: "50% 44%",
      })
    );
    ALL_PUPPIES.filter((p) => Boolean(p.cover) && p.status !== "rehomed").forEach((p) => {
      if (!bySlug.has(p.slug)) {
        bySlug.set(p.slug, {
          slug: p.slug,
          name: p.displayName,
          img: p.cover,
          objPos: p.media?.[0]?.focalPoint || "50% 44%",
        });
      }
    });
    return Array.from(bySlug.values());
  }, []);

  const [seats, setSeats] = useState(() => [0, 1, 2, 3, 4, 5].map((i) => i % pool.length));
  const [seatStates, setSeatStates] = useState(["idle", "idle", "idle", "idle", "idle", "idle"]);
  const [popTagSeat, setPopTagSeat] = useState(1);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const lastSeatRef = useRef(1);
  const seatsRef = useRef(seats);
  seatsRef.current = seats;

  useEffect(() => {
    if (pool.length <= 6) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let duckTimer = 0;
    let clearTimer = 0;

    const interval = setInterval(() => {
      // Pick a random seat different from the last one
      let seatIdx = Math.floor(Math.random() * 6);
      if (seatIdx === lastSeatRef.current) {
        seatIdx = (seatIdx + 1 + Math.floor(Math.random() * 4)) % 6;
      }
      lastSeatRef.current = seatIdx;

      // Pick a random puppy not currently visible in any seat
      const currentSet = new Set(seatsRef.current);
      const candidates = [];
      for (let i = 0; i < pool.length; i++) {
        if (!currentSet.has(i)) candidates.push(i);
      }
      const nextPupIdx =
        candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : (seatsRef.current[seatIdx] + 1) % pool.length;

      // Preload next image before popping
      const preImg = new Image();
      preImg.src = pool[nextPupIdx].img;

      // 1. Duck down
      setSeatStates((prev) => prev.map((s, i) => (i === seatIdx ? "duck" : s)));

      // 2. Swap & pop up with floating name note
      duckTimer = window.setTimeout(() => {
        setSeats((prev) => prev.map((val, i) => (i === seatIdx ? nextPupIdx : val)));
        setSeatStates((prev) => prev.map((s, i) => (i === seatIdx ? "pop" : s)));
        setPopTagSeat(seatIdx);

        clearTimer = window.setTimeout(() => {
          setSeatStates((prev) => prev.map((s, i) => (i === seatIdx ? "idle" : s)));
        }, 650);
      }, 360);
    }, 2300);

    return () => {
      clearInterval(interval);
      clearTimeout(duckTimer);
      clearTimeout(clearTimer);
    };
  }, [pool]);

  return (
    <div data-section="hero">
      <section
        aria-labelledby="hero-title"
        className="tp-scene tp-hero"
        data-pup-scene="true"
        data-tone="light"
        style={{ "--sky-top": "#fffdf8", "--sky-bottom": "#fff1d8", "--quilt": "#fff1d8" }}
      >
        <span aria-hidden="true" className="tp-hero__sun" />
        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
              preserveAspectRatio="none"
              viewBox="0 0 220 24"
            >
              <path
                d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </svg>
          </p>

          <h1 className="tp-hero__title font-plush" id="hero-title">
            <span className="tp-hero__line">Premium teacup</span>
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>

          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from
            trusted breeders worldwide.
          </p>

          <div className="tp-hero__actions">
            <Link className="btn btn-primary" to="/puppies">
              View available puppies
            </Link>
            <a
              className="btn btn-ghost"
              href={WA_LINK}
              rel="noopener noreferrer"
              target="_blank"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="tp-hero__stage">
          <ul aria-label="Some of the puppies in our showroom" className="tp-lineup">
            {seats.map((pupIdx, seatIdx) => {
              const pup = pool[pupIdx] || pool[0];
              return (
                <li key={seatIdx} className="tp-lineup__seat" style={SEAT_LAYOUT[seatIdx]}>
                  <Link
                    aria-label={`Meet ${pup.name}`}
                    className="tp-lineup__pup"
                    data-pup-friend="true"
                    data-state={seatStates[seatIdx]}
                    to={`/puppies/${pup.slug}`}
                    onMouseEnter={() => setHoveredSeat(seatIdx)}
                    onMouseLeave={() => setHoveredSeat(null)}
                  >
                    <span className="tp-lineup__photo">
                      <img
                        alt={pup.name}
                        src={pup.img}
                        loading="eager"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: pup.objPos,
                        }}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
            {seats.map((pupIdx, seatIdx) => {
              const pup = pool[pupIdx] || pool[0];
              const showTag =
                (hoveredSeat === seatIdx || popTagSeat === seatIdx) &&
                seatStates[seatIdx] !== "duck";
              return (
                <li key={seatIdx} className="tp-lineup__seat" style={SEAT_LAYOUT[seatIdx]}>
                  <span
                    className="tp-lineup__ghost"
                    data-tag={showTag ? "show" : undefined}
                  >
                    <span className="tp-lineup__name font-scrawl">{pup.name}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div
            className="pup-stop tp-hero__teddy"
            data-act="peekaboo"
            data-behind="true"
            data-facing="right"
            data-lane="true"
            data-pose="peek"
            data-pup-stop="true"
          >
            <PupBuddy
              pose="peek"
              facing="right"
              label="Teddy, the TeddyPups puppy, peeking over the quilt"
            />
            <span aria-hidden="true" className="pup-bubble" data-show="false" />
          </div>

          <div aria-hidden="true" className="tp-quilt">
            <svg className="tp-quilt__edge" height="40" preserveAspectRatio="none" width="100%">
              <defs>
                <pattern height="40" id="tp-scallop" patternUnits="userSpaceOnUse" width="76">
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
                  <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                  <path
                    d="M11 33A27 19 0 0 1 65 33"
                    fill="none"
                    opacity=".42"
                    stroke="#2a170e"
                    strokeDasharray="3.5 5.5"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                  />
                </pattern>
              </defs>
              <rect fill="url(#tp-scallop)" height="40" width="100%" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
