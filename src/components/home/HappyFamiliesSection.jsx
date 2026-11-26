import { useState } from "react";
import { Link } from "react-router-dom";
import { HAPPY_FAMILIES_PHOTOS } from "../../data/happyFamilies";
import PhotoLightbox from "../PhotoLightbox";

const FEATURED_WALL = [
  {
    idx: 0,
    tilt: "-2.2deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape tp-tape--center",
    img: "/media/dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg",
    cap: "Lulu 🧸 with her new mummy ❤️",
  },
  {
    idx: 1,
    tilt: "1.6deg",
    tape: "#f9cdbf",
    tapeClass: "tp-tape tp-tape--left",
    img: "/media/TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg",
    cap: "Adorable Maltipoo baby 🧸❤️",
  },
  {
    idx: 2,
    tilt: "-0.9deg",
    tape: "#cfe5f6",
    tapeClass: "tp-tape tp-tape--right",
    img: "/media/j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg",
    cap: "My new teddy puppy 🥰🧸",
  },
  {
    idx: 3,
    tilt: "2.4deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape tp-tape--tl",
    img: "/media/HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg",
    cap: "Our new puppies 🧸🥰🤗",
  },
  {
    idx: 4,
    tilt: "-1.5deg",
    tape: "#e9dcc4",
    tapeClass: "tp-tape tp-tape--center",
    img: "/media/uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg",
    cap: "New puppy 🧸😍",
  },
  {
    idx: 5,
    tilt: "0.8deg",
    tape: "#f6d79a",
    tapeClass: "tp-tape tp-tape--right",
    img: "/media/pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg",
    cap: "Gang of 3 😍🧸",
  },
  {
    idx: 6,
    tilt: "-2.6deg",
    tape: "#f9cdbf",
    tapeClass: "tp-tape tp-tape--left",
    img: "/media/4wOJk9azop_-/65ecf66bf0/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg",
    cap: "So happy 😍😍",
  },
  {
    idx: 7,
    tilt: "1.2deg",
    tape: "#cfe5f6",
    tapeClass: "tp-tape tp-tape--center",
    img: "/media/3h20rIasJCOa/10c307cb1c/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg",
    cap: "New pup 🤗💫",
  },
];

export default function HappyFamiliesSection() {
  const [viewerIdx, setViewerIdx] = useState(null);

  const lightboxPhotos =
    HAPPY_FAMILIES_PHOTOS.length > 0
      ? HAPPY_FAMILIES_PHOTOS
      : FEATURED_WALL.map((p, i) => ({
          id: `fw-${i}`,
          url: p.img,
          alt: "A happy TeddyPups family with their new puppy",
          caption: p.cap,
        }));

  return (
    <div data-section="families">
      <section
        aria-labelledby="dusk-title"
        className="tp-scene tp-dusk"
        data-pup-scene="true"
        data-tone="dark"
        style={{ "--sky-top": "#a65a30", "--sky-bottom": "#4d2b19" }}
      >
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <h2 className="font-plush text-huge" id="dusk-title">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members of loving families.
              These heartwarming moments have been shared by our valued clients who welcomed a Teddy
              Pup into their homes and hearts.
            </p>
          </div>

          <figure className="tp-dusk__note">
            <blockquote className="font-plush-text">
              “TeddyPups truly made our dream a reality. They supported us at every step of the
              import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having
              24/7 support throughout the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
          </figure>
        </div>

        <div className="tp-photowall">
          <div className="tp-photowall__wall">
            <ul aria-label="Photos from TeddyPups families" className="tp-photowall__prints">
              {FEATURED_WALL.map((item, i) => (
                <li key={item.img} data-reveal="true" style={{ "--d": `${(i % 4) * 110}ms` }}>
                  <button
                    aria-label={`Open photo ${i + 1} of ${lightboxPhotos.length}: ${item.cap}`}
                    className="tp-photowall__print"
                    type="button"
                    onClick={() => setViewerIdx(i)}
                  >
                    <span
                      className="tp-polaroid"
                      style={{ "--tilt": item.tilt, "--tape": item.tape, "--i": i }}
                    >
                      <span aria-hidden="true" className={item.tapeClass} />
                      <span className="tp-polaroid__photo">
                        <img
                          alt="A happy TeddyPups family with their new puppy"
                          src={item.img}
                          loading="lazy"
                          width={433}
                          height={433}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </span>
                      <span className="tp-polaroid__caption font-scrawl">{item.cap}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <Link className="btn btn-primary" to="/happy-families">
                See all happy families
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PhotoLightbox
        photos={lightboxPhotos}
        index={viewerIdx}
        onChangeIndex={setViewerIdx}
        onClose={() => setViewerIdx(null)}
      />
    </div>
  );
}
