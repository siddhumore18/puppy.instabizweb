import { useId, useState } from "react";
import { FAQS } from "../data/faqs";
import { WA_LINK } from "../components/Header";
import PupBuddy from "../components/PupBuddy";

const NOTE_STYLES = [
  { "--tilt": "-1.6deg", "--pin": "var(--color-toffee)" },
  { "--tilt": "1.2deg", "--pin": "var(--color-sky-deep)" },
  { "--tilt": "-0.8deg", "--pin": "#d9a13c" },
  { "--tilt": "1.5deg", "--pin": "var(--color-toffee-deep)" },
  { "--tilt": "-1.1deg", "--pin": "#1f6b45" },
];

export default function FaqPage() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState(null);

  const filtered = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div data-page="faq" className="tp-page">
      <section
        aria-labelledby="faq-title"
        className="tp-scene tp-faqroom overflow-hidden"
        data-pup-scene="true"
        data-tone="dark"
        style={{ "--sky-top": "#a95e32", "--sky-bottom": "#331c11" }}
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-4xl">
            <h1 className="font-plush text-giant" id="faq-title">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
              Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is
              available 24/7.
            </p>
          </header>

          <div className="mt-12 md:mt-16">
            <div className="tp-notes">
              <aside aria-label="Find a question" className="tp-notes__side">
                <label className="font-scrawl tp-notes__label" htmlFor={inputId}>
                  sniff out a question
                </label>
                <div className="tp-notes__search">
                  <svg aria-hidden="true" className="tp-notes__lens" viewBox="0 0 24 24">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m15.5 15.5 5 5" />
                  </svg>
                  <input
                    id={inputId}
                    autoComplete="off"
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setOpenIdx(null);
                    }}
                    placeholder="delivery, Korea, vaccinated…"
                  />
                </div>
                <p aria-live="polite" className="tp-notes__count">
                  {filtered.length} {filtered.length === 1 ? "note" : "notes"} on the board
                </p>

                <div className="tp-notes__teddy" data-open={openIdx !== null ? "true" : "false"}>
                  <span aria-hidden="true" className="tp-notes__bubble font-plush">
                    <span className="tp-notes__q">?</span>
                    <span className="tp-notes__a">!</span>
                  </span>
                  <PupBuddy pose="sit" facing="right" />
                </div>

                <a
                  className="btn btn-whatsapp tp-notes__ask"
                  href={WA_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ask on WhatsApp
                </a>
              </aside>

              <div className="tp-notes__board">
                {filtered.length === 0 ? (
                  <div className="tp-note tp-note--empty" data-reveal="true" data-revealed="true">
                    <p className="font-scrawl text-lg">
                      Nothing on the board for &ldquo;{query}&rdquo; — try another word or ask us on
                      WhatsApp!
                    </p>
                  </div>
                ) : (
                  <ul className="tp-notes__list">
                    {filtered.map((item, idx) => {
                      const isOpen = openIdx === idx;
                      const styleVars = NOTE_STYLES[idx % NOTE_STYLES.length];
                      return (
                        <li
                          key={item.q}
                          className="tp-note"
                          data-open={isOpen ? "true" : "false"}
                          data-reveal="true"
                          data-revealed="true"
                          style={{ ...styleVars, "--i": idx }}
                        >
                          <span aria-hidden="true" className="tp-note__pin" />
                          <h2 className="tp-note__q">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-controls={`faq-a-${idx}`}
                              id={`faq-q-${idx}`}
                              onClick={() => setOpenIdx(isOpen ? null : idx)}
                            >
                              <span className="font-plush-text">{item.q}</span>
                              <span aria-hidden="true" className="tp-note__chevron" />
                            </button>
                          </h2>
                          <div
                            id={`faq-a-${idx}`}
                            aria-labelledby={`faq-q-${idx}`}
                            role="region"
                            className="tp-note__answer"
                            hidden={!isOpen}
                          >
                            <div className="tp-note__flap">
                              <p>{item.a}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
