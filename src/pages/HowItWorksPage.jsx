import { useState } from "react";
import { Link } from "react-router-dom";
import { WA_LINK } from "../components/Header";
import PupBuddy from "../components/PupBuddy";

const LOCAL_STEPS = [
  {
    title: "Explore our puppies",
    text: "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.",
  },
  {
    title: "Choose your puppy",
    text: "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.",
  },
  {
    title: "Meet before you choose",
    text: "Spend time bonding before making your decision.",
  },
  {
    title: "Pick-up or delivery",
    text: "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.",
  },
];

const IMPORT_STEPS = [
  {
    title: "Choose your breed",
    text: "From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.",
  },
  {
    title: "Personalized consultation",
    text: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey.",
  },
  {
    title: "Health & travel prep",
    text: "Photos, videos, and verified health certificates are shared before your puppy travels with our trusted pet-travel partners.",
  },
  {
    title: "Safe arrival & support",
    text: "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.",
  },
];

export default function HowItWorksPage() {
  const [tab, setTab] = useState("local");
  const steps = tab === "local" ? LOCAL_STEPS : IMPORT_STEPS;

  return (
    <div data-page="how" className="tp-page">
      <section
        aria-labelledby="how-title"
        className="tp-scene"
        data-pup-scene="true"
        data-tone="light"
        style={{ "--sky-top": "#fffbf3", "--sky-bottom": "#f6cc85" }}
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1 className="font-plush text-giant md:col-span-7" id="how-title">
              How it works
            </h1>
            <p className="text-lede text-[var(--ink-soft)] md:col-span-5 md:pb-4">
              Whether you choose to visit us locally or order a premium breed from overseas,
              TeddyPups is here to make the experience unforgettable.
            </p>
          </header>

          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            <a
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
              href="#two-ways"
            >
              <span className="font-plush text-toffee">1</span> Two ways home
            </a>
            <a
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
              href="#promise"
            >
              <span className="font-plush text-toffee">2</span> Our premium puppy promise
            </a>
            <a
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
              href="#delivery"
            >
              <span className="font-plush text-toffee">3</span> Delivery &amp; collection
            </a>
            <a
              className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft"
              href="#why"
            >
              <span className="font-plush text-toffee">4</span> Why choose us
            </a>
          </nav>

          <div id="two-ways">
            <section aria-labelledby="two-ways-title" className="tp-journeys">
              <div className="tp-journeys__top">
                <div>
                  <p className="font-scrawl tp-journeys__kicker">choose your way</p>
                  <h2 className="font-plush text-big" id="two-ways-title">
                    Two ways home
                  </h2>
                </div>

                <div className="tp-journeys__pick">
                  <div
                    aria-label="Ways to bring your puppy home"
                    className="tp-switch"
                    role="tablist"
                    style={{ "--at": tab === "local" ? 0 : 1, "--n": 2 }}
                  >
                    <span aria-hidden="true" className="tp-switch__thumb" />
                    <button
                      aria-controls="panel-local"
                      aria-selected={tab === "local"}
                      className="tp-switch__tab"
                      id="tab-local"
                      role="tab"
                      type="button"
                      onClick={() => setTab("local")}
                    >
                      <span className="font-plush tp-switch__label">In Dubai</span>
                      <span className="tp-switch__hint">meet in person</span>
                    </button>
                    <button
                      aria-controls="panel-imported"
                      aria-selected={tab === "imported"}
                      className="tp-switch__tab"
                      id="tab-imported"
                      role="tab"
                      type="button"
                      onClick={() => setTab("imported")}
                    >
                      <span className="font-plush tp-switch__label">Imported</span>
                      <span className="tp-switch__hint">order upon request</span>
                    </button>
                  </div>

                  <div className="tp-journeys__teddy">
                    <PupBuddy
                      pose="sit"
                      facing="right"
                      label="Teddy, waiting to see which way you pick"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-plush tp-journey__title">
                  {tab === "local" ? "Meet your puppy in person" : "Order upon request"}
                </h3>
                {tab === "imported" && (
                  <p className="font-scrawl mt-4 text-toffee-ink">
                    From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the
                    world&apos;s finest puppies to Dubai, just for you.
                  </p>
                )}

                <ol className="tp-steps mt-8">
                  {steps.map((s, idx) => (
                    <li key={s.title} className="tp-step tp-board">
                      <span className="tp-step__num font-plush">Step {idx + 1}</span>
                      <h4 className="tp-step__title font-plush">{s.title}</h4>
                      <p className="tp-step__text">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>

          <section id="promise" className="tp-paper mt-24 -rotate-[0.6deg]">
            <p className="font-scrawl text-lg text-toffee-ink">puppy passport</p>
            <h2 className="font-plush text-huge mt-1 max-w-[16ch]">Our premium puppy promise</h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              <li className="tp-entry">
                <h3 className="font-plush text-2xl text-cocoa">Hand-selected breeders</h3>
                <p className="tp-entry__text mt-2">
                  We work only with breeders who uphold the highest ethical and health standards.
                </p>
              </li>
              <li className="tp-entry">
                <h3 className="font-plush text-2xl text-cocoa">Full transparency</h3>
                <p className="tp-entry__text mt-2">
                  Photos, videos, and health certificates are shared before your puppy travels.
                </p>
              </li>
              <li className="tp-entry">
                <h3 className="font-plush text-2xl text-cocoa">Safe, stress-free delivery</h3>
                <p className="tp-entry__text mt-2">
                  We handle every detail of the import process, so your puppy arrives happy,
                  healthy, and ready to love you.
                </p>
              </li>
            </ul>
          </section>

          <section id="delivery" className="mt-24 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="font-plush text-huge">Delivery &amp; collection</h2>
              <p className="text-lede mt-5 text-[var(--ink-soft)]">
                From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels
                comfortably and arrives safely.
              </p>

              <ul className="mt-8 space-y-6">
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Take your puppy home the same day
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    Local puppies are available immediately — visit, fall in love, and go home
                    together.
                  </p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Delivery within Dubai
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    Prefer to stay home? We deliver your puppy to your door within Dubai, safely and
                    comfortably.
                  </p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Safe international cargo
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    We handle all the paperwork and ensure comfortable travel so your puppy arrives
                    happy and stress-free.
                  </p>
                </li>
                <li>
                  <h3 className="font-plush-text text-[1.3rem] font-bold leading-snug">
                    Worldwide delivery
                  </h3>
                  <p className="mt-1.5 text-[var(--ink-soft)]">
                    We safely deliver puppies to loving homes all around the world. Our trusted
                    international cargo partners ensure your new furry friend travels comfortably
                    and arrives safely, no matter the distance.
                  </p>
                </li>
              </ul>
            </div>

            <div className="space-y-6 lg:col-span-6">
              <div className="tp-postcard">
                <p className="tp-postcard__from font-scrawl">from Downtown Dubai</p>
                <h3 className="font-plush mt-2 text-3xl">Meet local puppies</h3>
                <p className="mt-3 text-cocoa-soft">
                  Visit our Dubai showroom and take your new best friend home the same day.
                </p>
                <div className="mt-6">
                  <Link className="btn btn-primary" to="/puppies?origin=local">
                    Meet local puppies
                  </Link>
                </div>
              </div>

              <div className="tp-postcard tp-postcard--sky">
                <p className="tp-postcard__from font-scrawl">Korea → Dubai &amp; worldwide</p>
                <h3 className="font-plush mt-2 text-3xl">Imported for you</h3>
                <p className="mt-3 text-cocoa-soft">
                  Order from the world&apos;s most reputable breeders and let us handle the import.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link className="btn btn-primary" to="/puppies?origin=imported">
                    See imported puppies
                  </Link>
                  <a
                    className="btn btn-whatsapp"
                    href={WA_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="why" className="mt-24 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-plush text-huge">Why choose us</h2>
            </div>
            <ul className="space-y-8 lg:col-span-7">
              <li className="flex gap-5">
                <div>
                  <h3 className="font-plush text-[1.7rem]">International cargo</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    We safely deliver puppies to loving homes all around the world. Our trusted
                    international cargo partners ensure your new furry friend travels comfortably
                    and arrives safely, no matter the distance.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div>
                  <h3 className="font-plush text-[1.7rem]">Support 24/7</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    Our team is available 24/7 to answer your questions and assist you through every
                    step of the adoption process. From choosing your puppy to post-delivery support —
                    we&apos;re just a message away.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div>
                  <h3 className="font-plush text-[1.7rem]">Health guarantee</h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    All our puppies come with a verified health certificate from licensed vets. We
                    ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining
                    your family.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
