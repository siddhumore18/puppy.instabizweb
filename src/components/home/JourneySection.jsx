import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PAW_PATH } from "../PawIcon";
import PupBuddy from "../PupBuddy";
import { WA_LINK } from "../Header";

const STEPS = [
  {
    title: "Choose your breed",
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    title: "Get photos & details",
    text: "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
  },
  {
    title: "Secure & safe delivery",
    text: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
  },
];

const BREED_CHIPS = [
  { label: "Maltipoo", to: "/puppies?breed=maltipoo" },
  { label: "Pomeranian", to: "/puppies?breed=pomeranian" },
  { label: "Poodle", to: "/puppies?breed=poodle" },
  { label: "Cavapoo", to: "/puppies?breed=cavapoo" },
  { label: "Shih Tzu", to: "/puppies?breed=shih-tzu" },
];

const SNAPS = [
  {
    src: "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
    alt: "A tiny apricot teddy bear puppy held up in the TeddyPups showroom",
    pos: "54.3% 48.3%",
  },
  {
    src: "/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
    alt: "The apricot teddy bear puppy from our showroom, close up",
    pos: "46.0% 44.4%",
  },
  {
    src: "/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
    alt: "The apricot teddy bear puppy from our showroom, looking up",
    pos: "43.7% 40.2%",
  },
  {
    src: "/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg",
    alt: "The apricot teddy bear puppy from our showroom, held up to say hello",
    pos: "45.3% 44.4%",
  },
];

export default function JourneySection() {
  const gridRef = useRef(null);
  const videoRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = gridRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh * 0.65 - rect.top) / Math.max(1, rect.height * 0.75)));
      const nextStep = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
      setActiveStep((prev) => {
        if (prev !== nextStep) {
          setTyping(true);
        }
        return nextStep;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyping(false), 650);
    return () => clearTimeout(t);
  }, [typing]);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div data-section="journey">
      <section
        aria-labelledby="journey-title"
        className="tp-scene tp-chat"
        data-pup-scene="true"
        data-tone="light"
        style={{ "--sky-top": "#f7d18d", "--sky-bottom": "#f0b866" }}
      >
        <div ref={gridRef} className="tp-chat__grid gutter" data-pin-range="true">
          <div className="tp-chat__story">
            <h2 className="font-plush text-huge" id="journey-title">
              Your puppy journey
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and
              purely joyful.
            </p>

            <ol className="tp-chat__steps">
              {STEPS.map((s, idx) => (
                <li
                  key={s.title}
                  className="tp-chat__step"
                  data-active={idx === activeStep ? "true" : undefined}
                  data-done={idx < activeStep ? "true" : undefined}
                >
                  <span aria-hidden="true" className="tp-chat__num font-plush">
                    {idx + 1}
                  </span>
                  <h3 className="font-plush tp-chat__title">{s.title}</h3>
                  <p className="tp-chat__text">{s.text}</p>
                </li>
              ))}
            </ol>

            <Link className="btn btn-ghost tp-chat__cta" to="/how-it-works">
              How it works
            </Link>
          </div>

          <div className="tp-chat__side">
            <div aria-label="A WhatsApp conversation with TeddyPups U.A.E." className="tp-phone" role="group">
              <div className="tp-phone__bar">
                <img
                  alt=""
                  className="tp-phone__avatar"
                  height={40}
                  width={40}
                  src="/brand/logo.png"
                />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">{typing ? "typing..." : "online"}</span>
                </span>
              </div>

              <div className="tp-phone__screen">
                <p className="tp-msg tp-msg--me">
                  Hi TeddyPups! I&apos;d love to know more about your puppies.
                </p>

                <div className="tp-msg-group" data-show={activeStep >= 0 ? "true" : "false"} data-step="0">
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Select your preferred breed or tell us what you&apos;re looking for.
                      We&apos;ll guide you based on availability and your lifestyle.
                    </p>
                    <ul aria-label="Breeds we have now" className="tp-chips">
                      {BREED_CHIPS.map((b) => (
                        <li key={b.label}>
                          <Link to={b.to}>{b.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="tp-msg-group" data-show={activeStep >= 1 ? "true" : "false"} data-step="1">
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      {SNAPS.map((snap) => (
                        <span key={snap.src} className="tp-snaps__one">
                          <img
                            alt={snap.alt}
                            src={snap.src}
                            loading="lazy"
                            style={{
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: snap.pos,
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-clip" data-playing={playing ? "true" : "false"}>
                      <video
                        ref={videoRef}
                        aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
                        loop
                        muted
                        playsInline
                        poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                        preload="none"
                        src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                        onClick={toggleVideo}
                      />
                      <button
                        aria-label={playing ? "Pause video" : "Play video"}
                        aria-pressed={playing}
                        className="tp-clip__play"
                        type="button"
                        onClick={toggleVideo}
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                          {playing ? (
                            <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                          ) : (
                            <path d="M8 5v14l11-7z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="tp-msg tp-msg--them">
                    Our team will share real photos, health details, and all necessary information
                    directly on WhatsApp.
                  </p>
                </div>

                <div className="tp-msg-group" data-show={activeStep >= 2 ? "true" : "false"} data-step="2">
                  <div className="tp-msg tp-msg--them">
                    <p>
                      Once confirmed, we handle everything professionally and ensure your puppy
                      reaches you safely and stress-free.
                    </p>
                    <svg aria-hidden="true" className="tp-route" viewBox="0 0 220 70">
                      <path className="tp-route__line" d="M14 52 C 60 6, 120 70, 170 28" />
                      <circle className="tp-route__dot" cx="14" cy="52" r="5" />
                      <path className="tp-route__home" d="M164 32 l12 -12 l12 12 v14 h-24 z" />
                      <path
                        className="tp-route__heart"
                        d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                      />
                      <path
                        className="tp-route__paw"
                        d={PAW_PATH}
                        transform="translate(70 22) scale(.3) rotate(70 32 32)"
                      />
                      <path
                        className="tp-route__paw"
                        d={PAW_PATH}
                        transform="translate(104 38) scale(.3) rotate(100 32 32)"
                      />
                    </svg>
                  </div>
                </div>

                <p aria-hidden="true" className="tp-typing" data-show={typing ? "true" : "false"}>
                  <span />
                  <span />
                  <span />
                </p>
              </div>

              <a
                className="tp-phone__compose"
                href={WA_LINK}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Say hello on WhatsApp</span>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
                </svg>
              </a>
            </div>

            <div
              className="pup-stop tp-chat__teddy"
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
