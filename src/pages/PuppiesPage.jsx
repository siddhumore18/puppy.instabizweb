import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ALL_PUPPIES } from "../data/puppies";
import PawIcon from "../components/PawIcon";

const BREED_FILTERS = ["All", "Maltipoo", "Poodle", "Pomeranian", "Cavapoo", "Shih Tzu"];

export default function PuppiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const originParam = searchParams.get("origin") || "all";
  const breedParam = searchParams.get("breed") || "all";
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const availablePuppies = useMemo(
    () => ALL_PUPPIES.filter((p) => p.status !== "rehomed"),
    []
  );
  const rehomedPuppies = useMemo(
    () => ALL_PUPPIES.filter((p) => p.status === "rehomed").slice(0, 6),
    []
  );

  const filtered = useMemo(() => {
    return availablePuppies.filter((p) => {
      if (originParam !== "all" && p.origin !== originParam) return false;
      if (
        breedParam !== "all" &&
        !p.breed.toLowerCase().replace(/\s+/g, "-").includes(breedParam.toLowerCase()) &&
        !p.displayName.toLowerCase().includes(breedParam.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [availablePuppies, originParam, breedParam]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  return (
    <div data-page="puppies" className="tp-page">
      <section className="tp-sketchbook">
        <header className="tp-sketchbook__head gutter mx-auto max-w-[110rem]">
          <div className="tp-sketchbook__words">
            <p className="tp-sketchbook__caption font-scrawl">
              real puppies, real photos
              <svg
                aria-hidden="true"
                className="tp-sketchbook__underline text-toffee"
                viewBox="0 0 220 24"
                preserveAspectRatio="none"
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
            <h1 className="tp-sketchbook__title font-plush text-huge">Available puppies</h1>
            <p className="tp-sketchbook__lede text-lede mt-4 max-w-[44ch] text-cocoa-soft">
              Meet our locally available puppies in Dubai or reserve an exclusive Korean teacup
              breed for safe delivery.
            </p>
          </div>
        </header>

        <div className="gutter mx-auto mt-8 max-w-[110rem]">
          <div className="flex flex-wrap items-center gap-3">
            {[
              { key: "all", label: "All origins" },
              { key: "local", label: "Puppies in Dubai" },
              { key: "imported", label: "Imported for you" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFilter("origin", opt.key)}
                className={`rounded-full border-2 border-cocoa px-4 py-2 text-sm font-semibold transition ${
                  originParam === opt.key
                    ? "bg-cocoa text-milk"
                    : "bg-milk text-cocoa hover:bg-honey-soft"
                }`}
              >
                {opt.label}
              </button>
            ))}

            <span className="mx-1 hidden h-6 w-px bg-cocoa/20 sm:inline-block" />

            {BREED_FILTERS.map((b) => {
              const val = b === "All" ? "all" : b.toLowerCase().replace(/\s+/g, "-");
              const active = breedParam === val;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFilter("breed", val)}
                  className={`rounded-full border-2 border-cocoa px-4 py-2 text-sm font-semibold transition ${
                    active ? "bg-toffee text-milk" : "bg-milk text-cocoa hover:bg-honey-soft"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>

          <ul className="tp-doors mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((pup, idx) => (
              <li
                key={pup.slug}
                className="tp-door mx-auto"
                data-open={hoveredIdx === idx ? "true" : "true"}
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
                    <span className="tp-door__meta">
                      {pup.breed}, {pup.genderLabel}, {pup.age}
                      {pup.media?.some((m) => m.kind === "video") ? ", with video" : ""}
                    </span>
                  </span>
                  <span className="tp-door__frame">
                    <span className="tp-door__room">
                      {pup.cover && (
                        <img
                          alt={pup.displayName}
                          src={pup.cover}
                          loading={idx < 8 ? "eager" : "lazy"}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </span>
                    <span aria-hidden="true" className="tp-door__way">
                      <span className="tp-door__leaf">
                        <PawIcon className="tp-door__peephole" />
                        <span className="tp-door__knob" />
                      </span>
                    </span>
                    <span className="tp-door__tag font-scrawl">
                      {pup.status === "reserved" ? "Reserved" : "Available"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {rehomedPuppies.length > 0 && (
        <section className="tp-gone-strip gutter mx-auto max-w-[110rem] py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-scrawl text-lg text-toffee">already loved &amp; settled</p>
              <h2 className="font-plush text-big">Gone home</h2>
            </div>
            <Link className="btn btn-ghost" to="/gone-home">
              See all gone home
            </Link>
          </div>
          <div className="tp-gone-strip__row mt-8">
            {rehomedPuppies.map((pup) => (
              <Link
                key={pup.slug}
                to={`/puppies/${pup.slug}`}
                className="tp-board block !p-3 transition hover:-translate-y-1"
              >
                {pup.cover && (
                  <img
                    src={pup.cover}
                    alt={pup.displayName}
                    className="aspect-square w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                )}
                <p className="font-plush mt-3 text-lg">{pup.displayName}</p>
                <p className="font-scrawl text-sm text-toffee">Gone home</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
