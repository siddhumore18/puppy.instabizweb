import { useState } from "react";
import { WA_LINK } from "../components/Header";
import PupBuddy from "../components/PupBuddy";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div data-page="contact" className="tp-page">
      <section className="tp-scene gutter mx-auto max-w-[100rem] py-12 md:py-16">
        <header className="tp-page-head">
          <div>
            <p className="font-scrawl text-lg text-toffee">say hello</p>
            <h1 className="font-plush text-huge mt-1">Get in touch with us</h1>
          </div>
          <p className="text-lede max-w-[44ch] text-cocoa-soft">
            Visit our Downtown Dubai showroom to meet our locally available puppies, or send us a
            note anytime.
          </p>
        </header>

        <div className="tp-post mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="tp-visit relative tp-board p-7 pt-6">
              <div className="tp-visit__photo mb-5 overflow-hidden rounded-2xl border-2 border-cocoa">
                <img
                  src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                  alt="TeddyPups U.A.E. Dubai Showroom"
                  className="h-64 w-full object-cover"
                />
              </div>
              <h2 className="font-plush text-2xl">TeddyPups U.A.E. Showroom</h2>
              <p className="mt-2 text-cocoa-soft">Downtown Dubai, United Arab Emirates</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <strong>WhatsApp: </strong>
                  <a
                    className="font-semibold text-toffee underline"
                    href={WA_LINK}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    +971 50 000 0000
                  </a>
                </li>
                <li>
                  <strong>Email: </strong>
                  <a className="font-semibold text-toffee underline" href="mailto:info@instabizweb.com">
                    info@instabizweb.com
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <a className="btn btn-whatsapp w-full" href={WA_LINK} rel="noopener noreferrer" target="_blank">
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="tp-letterform tp-board relative">
              <div className="mb-4 flex items-center justify-between">
                <p className="tp-letterform__greeting font-scrawl text-xl text-toffee">
                  dear TeddyPups,
                </p>
                <div className="w-24">
                  <PupBuddy pose="peek" facing="left" />
                </div>
              </div>

              {sent ? (
                <div className="tp-post__sent py-8 text-center">
                  <p className="font-plush text-3xl text-toffee">Note posted!</p>
                  <p className="mt-2 text-cocoa-soft">
                    Thank you for reaching out. For the fastest reply, you can also chat with us
                    directly on WhatsApp.
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp mt-6"
                  >
                    Chat on WhatsApp
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
                      required
                      rows={4}
                      placeholder="Tell us which breed or puppy you're looking for..."
                      className="mt-1 w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-2.5 outline-none focus:border-toffee"
                    />
                  </label>
                  <p className="tp-letterform__sign font-scrawl text-cocoa-soft">
                    with love, a future puppy parent
                  </p>
                  <button type="submit" className="btn btn-primary">
                    Send note
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
