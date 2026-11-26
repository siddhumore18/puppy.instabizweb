import { Link } from "react-router-dom";
import PupBuddy from "../PupBuddy";

const NIGHT_STARS = [
  { left: "8%", top: "12%", width: "16.2px", delay: "0.00s" },
  { left: "22%", top: "30%", width: "9px", delay: "0.40s" },
  { left: "41%", top: "8%", width: "12.6px", delay: "0.80s" },
  { left: "57%", top: "22%", width: "8.1px", delay: "1.20s" },
  { left: "72%", top: "6%", width: "14.4px", delay: "1.60s" },
  { left: "88%", top: "18%", width: "10.8px", delay: "2.00s" },
  { left: "95%", top: "42%", width: "9px", delay: "2.40s" },
  { left: "4%", top: "58%", width: "10.8px", delay: "2.80s" },
  { left: "34%", top: "70%", width: "7.2px", delay: "3.20s" },
  { left: "63%", top: "84%", width: "9.9px", delay: "3.60s" },
  { left: "83%", top: "66%", width: "12.6px", delay: "4.00s" },
];

const FEATURED_QA = [
  {
    q: "Are your puppies vaccinated and health-checked?",
    a: "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before going to their new home.",
  },
  {
    q: "Can I meet a puppy before I decide?",
    a: "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
  },
  {
    q: "Can I take my puppy home the same day?",
    a: "Local puppies are available immediately, so you can take your puppy home the same day.",
  },
];

export default function FaqSection() {
  return (
    <div data-section="questions">
      <section
        aria-labelledby="questions-title"
        className="tp-scene tp-night"
        data-pup-scene="true"
        data-tone="dark"
        style={{ "--sky-top": "#4d2b19", "--sky-bottom": "#2f1a10" }}
      >
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          {NIGHT_STARS.map((s, i) => (
            <svg
              key={i}
              aria-hidden="true"
              className="tp-twinkle absolute text-honey"
              style={{ left: s.left, top: s.top, width: s.width, animationDelay: s.delay }}
              viewBox="0 0 40 40"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 className="font-plush text-huge" id="questions-title">
              Questions, answered
            </h2>
            <Link className="btn btn-ghost tp-night__cta" to="/faq">
              Read all questions
            </Link>
            <div className="tp-night__pup">
              <span aria-hidden="true" className="tp-night__wonder font-plush">
                ?
              </span>
              <div
                className="pup-stop tp-night__teddy"
                data-act="tilt"
                data-facing="right"
                data-pose="sit"
                data-pup-stop="true"
              >
                <PupBuddy pose="sit" facing="right" />
              </div>
            </div>
          </div>

          <dl className="tp-qa">
            {FEATURED_QA.map((item) => (
              <div key={item.q} className="tp-qa__item">
                <dt className="font-plush tp-qa__q">{item.q}</dt>
                <dd className="tp-qa__a">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
