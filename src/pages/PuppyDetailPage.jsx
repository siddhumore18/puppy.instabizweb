import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ALL_PUPPIES } from "../data/puppies";
import { WA_LINK } from "../components/Header";
import PawIcon from "../components/PawIcon";
import PupBuddy from "../components/PupBuddy";
import PhotoLightbox from "../components/PhotoLightbox";

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const idx = Math.max(0, ALL_PUPPIES.findIndex((p) => p.slug === slug));
  const puppy = ALL_PUPPIES[idx] || ALL_PUPPIES[0];
  const prevPup = ALL_PUPPIES[(idx - 1 + ALL_PUPPIES.length) % ALL_PUPPIES.length];
  const nextPup = ALL_PUPPIES[(idx + 1) % ALL_PUPPIES.length];

  const mediaList =
    puppy.media && puppy.media.length > 0
      ? puppy.media
      : puppy.cover
        ? [{ kind: "image", url: puppy.cover, alt: puppy.displayName }]
        : [];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [sent, setSent] = useState(false);

  const safeIdx = Math.min(selectedIdx, Math.max(0, mediaList.length - 1));
  const currentMedia = mediaList[safeIdx];

  const imageOnlyList = mediaList.filter((m) => m.kind !== "video");

  const statusLabel =
    puppy.status === "rehomed"
      ? "Gone home"
      : puppy.status === "reserved"
        ? "Reserved"
        : "Available";

  const whereLabel =
    puppy.originLabel ||
    (puppy.origin === "imported" ? "Imported for you" : "In our Dubai showroom");

  const genderCap =
    puppy.genderLabel.charAt(0).toUpperCase() + puppy.genderLabel.slice(1);

  return (
    <div data-page="pup" className="tp-page">
      <article
        className="tp-storybook"
        style={{
          background: `linear-gradient(180deg, color-mix(in oklab, ${
            puppy.tone || "#e8e8e8"
          } 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
        }}
      >
        <div aria-hidden="true" className="tp-ribbon">
          <div className="tp-ribbon__track">
            <span className="tp-ribbon__band" style={{ "--door": puppy.doorColor }} />
          </div>
        </div>

        <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
          <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft">
            <Link className="link-ink" to="/puppies">
              Available puppies
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{puppy.displayName}</span>
          </nav>

          <p className="tp-chapter">
            <span aria-hidden="true" className="tp-chapter__n font-plush">
              1
            </span>
            <span className="font-scrawl">hello, it&apos;s me</span>
          </p>

          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <div>
                <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
                  {currentMedia?.kind === "video" ? (
                    <video
                      key={currentMedia.url}
                      src={currentMedia.url}
                      poster={currentMedia.poster}
                      className="size-full object-cover"
                      loop
                      playsInline
                      autoPlay
                      controls
                      aria-label={`Video of ${puppy.displayName}`}
                    />
                  ) : currentMedia?.url ? (
                    <button
                      type="button"
                      className="absolute inset-0 block size-full"
                      aria-label={`Open ${puppy.displayName}, photo ${safeIdx + 1} of ${mediaList.length} full screen`}
                      onClick={() => {
                        const imgIdx = imageOnlyList.findIndex(
                          (m) => m.url === currentMedia.url
                        );
                        setLightboxIdx(imgIdx >= 0 ? imgIdx : 0);
                      }}
                    >
                      <img
                        src={currentMedia.url}
                        alt={currentMedia.alt || puppy.displayName}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: currentMedia.focalPoint || "50% 45%",
                        }}
                      />
                    </button>
                  ) : null}

                  {mediaList.length > 1 && (
                    <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
                      <button
                        type="button"
                        aria-label="Previous photo"
                        className="pointer-events-auto grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold text-cocoa shadow-sm transition hover:bg-honey"
                        onClick={() =>
                          setSelectedIdx((safeIdx - 1 + mediaList.length) % mediaList.length)
                        }
                      >
                        ‹
                      </button>
                      <span className="rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
                        {safeIdx + 1} / {mediaList.length}
                      </span>
                      <button
                        type="button"
                        aria-label="Next photo"
                        className="pointer-events-auto grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold text-cocoa shadow-sm transition hover:bg-honey"
                        onClick={() => setSelectedIdx((safeIdx + 1) % mediaList.length)}
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                {mediaList.length > 1 && (
                  <ul className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]">
                    {mediaList.map((m, i) => {
                      const active = i === safeIdx;
                      const thumbSrc = m.kind === "video" ? m.poster || puppy.cover : m.url;
                      return (
                        <li key={`${m.url}-${i}`} className="shrink-0">
                          <button
                            type="button"
                            aria-label={`${puppy.displayName}, ${m.kind === "video" ? "video" : "photo"} ${i + 1} of ${mediaList.length}`}
                            aria-current={active ? "true" : "false"}
                            onClick={() => setSelectedIdx(i)}
                            className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${
                              active
                                ? "-translate-y-1 -rotate-3 border-toffee-deep"
                                : "border-cocoa/30 hover:-rotate-2 hover:border-cocoa"
                            }`}
                          >
                            {thumbSrc && (
                              <img
                                src={thumbSrc}
                                alt=""
                                className="size-full object-cover"
                                loading="lazy"
                              />
                            )}
                            {m.kind === "video" && (
                              <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-lg text-milk">
                                ▶
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
                <div
                  className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20"
                  data-reveal="true"
                  data-revealed="true"
                >
                  <span aria-hidden="true" className="tp-tag__ring" />
                  <div className="pup-buddy absolute -top-[4.8rem] right-6 w-[9.5rem]">
                    <PupBuddy
                      pose="peek"
                      facing="right"
                      label={`Teddy, peeking over ${puppy.displayName}'s tag`}
                    />
                  </div>

                  <span className="chip">
                    <PawIcon className="size-3.5 text-toffee" />
                    {statusLabel}
                  </span>

                  <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
                    {puppy.displayName}
                  </h1>

                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Breed</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.breed}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Boy or girl</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold">{genderCap}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Age</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold">{puppy.age}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Where</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold">{whereLabel}</dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      Ask about this puppy on WhatsApp
                    </a>
                    <a href={`#enquire-${puppy.slug}`} className="btn btn-ghost">
                      Send an enquiry
                    </a>
                  </div>
                </div>

                <div className="tp-paper mt-8 -rotate-1">
                  <p className="tp-chapter">
                    <span aria-hidden="true" className="tp-chapter__n font-plush">
                      2
                    </span>
                    <span className="font-scrawl">what comes with {puppy.displayName}</span>
                  </p>
                  <h2 className="font-plush mt-1 text-[1.9rem]">Every Teddy Pup comes</h2>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      "Vaccinated",
                      "Dewormed",
                      "Verified health certificate from licensed vets",
                      "Thoroughly checked before joining your family",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 font-semibold">
                        <svg
                          viewBox="0 0 32 32"
                          className="mt-0.5 size-6 shrink-0 text-toffee-deep"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 17l7 7L27 8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <section aria-labelledby={`home-steps-${puppy.slug}`} className="mt-20">
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                3
              </span>
              <span className="font-scrawl">the way home</span>
            </p>
            <h2 id={`home-steps-${puppy.slug}`} className="font-plush text-big mt-3">
              {puppy.origin === "imported"
                ? "Coming home from abroad"
                : "Coming home from our Dubai showroom"}
            </h2>
            <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  1
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  Reserve your puppy
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  Tell us which puppy has captured your heart.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  2
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  Health &amp; travel prep
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We handle vet checks, vaccinations, and all paperwork with 24/7 updates.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  3
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  Welcome home
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  Safe delivery to your door and ongoing support for a smooth transition.
                </p>
              </li>
            </ol>
          </section>

          <section
            id={`enquire-${puppy.slug}`}
            aria-labelledby={`enquire-title-${puppy.slug}`}
            className="tp-letter mt-20 grid gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="tp-chapter">
                <span aria-hidden="true" className="tp-chapter__n font-plush">
                  4
                </span>
                <span className="font-scrawl">dear TeddyPups…</span>
              </p>
              <h2 id={`enquire-title-${puppy.slug}`} className="font-plush text-big mt-2">
                Ask about this puppy
              </h2>
              <p className="mt-4 text-cocoa-soft">
                Send a note and our team will reply with more photos, videos, and details right
                away.
              </p>
            </div>
            <div className="tp-board lg:col-span-7">
              {sent ? (
                <div className="py-6 text-center">
                  <p className="font-plush text-2xl text-toffee">Thank you!</p>
                  <p className="mt-2 text-cocoa-soft">
                    Your enquiry about {puppy.displayName} is ready — feel free to also message us
                    directly on WhatsApp for an instant reply.
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp mt-6"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-scrawl text-sm text-cocoa-soft">Your name</span>
                      <input
                        required
                        type="text"
                        placeholder="Sarah"
                        className="mt-1 w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-2.5 outline-none focus:border-toffee"
                      />
                    </label>
                    <label className="block">
                      <span className="font-scrawl text-sm text-cocoa-soft">
                        WhatsApp or email
                      </span>
                      <input
                        required
                        type="text"
                        placeholder="+971 50 ..."
                        className="mt-1 w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-2.5 outline-none focus:border-toffee"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-scrawl text-sm text-cocoa-soft">Message</span>
                    <textarea
                      rows={3}
                      defaultValue={`Hi! I'd love to know more about ${puppy.displayName}.`}
                      className="mt-1 w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-2.5 outline-none focus:border-toffee"
                    />
                  </label>
                  <button type="submit" className="btn btn-primary">
                    Send enquiry
                  </button>
                </form>
              )}
            </div>
          </section>

          <nav
            aria-label="More puppies"
            className="mt-20 grid gap-6 sm:grid-cols-2"
          >
            <Link
              to={`/puppies/${prevPup.slug}`}
              onClick={() => setSelectedIdx(0)}
              className="flex items-center gap-4 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 shadow-[4px_6px_0_#2a170e1c] transition hover:-translate-y-0.5"
            >
              {prevPup.cover && (
                <img
                  src={prevPup.cover}
                  alt=""
                  className="size-16 shrink-0 rounded-2xl object-cover"
                />
              )}
              <div>
                <span className="font-scrawl text-sm text-toffee">← Previous puppy</span>
                <p className="font-plush text-xl">{prevPup.displayName}</p>
              </div>
            </Link>

            <Link
              to={`/puppies/${nextPup.slug}`}
              onClick={() => setSelectedIdx(0)}
              className="flex items-center justify-end gap-4 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 text-right shadow-[4px_6px_0_#2a170e1c] transition hover:-translate-y-0.5"
            >
              <div>
                <span className="font-scrawl text-sm text-toffee">Next puppy →</span>
                <p className="font-plush text-xl">{nextPup.displayName}</p>
              </div>
              {nextPup.cover && (
                <img
                  src={nextPup.cover}
                  alt=""
                  className="size-16 shrink-0 rounded-2xl object-cover"
                />
              )}
            </Link>
          </nav>
        </div>
      </article>

      <PhotoLightbox
        photos={imageOnlyList}
        index={lightboxIdx}
        onChangeIndex={setLightboxIdx}
        onClose={() => setLightboxIdx(null)}
      />
    </div>
  );
}
