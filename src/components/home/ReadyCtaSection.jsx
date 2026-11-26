import { Link } from "react-router-dom";
import PupBuddy from "../PupBuddy";
import { WA_LINK } from "../Header";

export default function ReadyCtaSection() {
  return (
    <div data-section="cta">
      <section
        aria-labelledby="cta-title"
        className="tp-scene tp-home"
        data-pup-scene="true"
        data-tone="dark"
        style={{ "--sky-top": "#2f1a10", "--sky-bottom": "#24130b" }}
      >
        <div className="tp-home__copy gutter">
          <h2 className="font-plush text-huge" id="cta-title">
            Ready to meet your new best friend?
          </h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of
            the way. We help you find the right match and ensure a smooth, safe delivery across the
            UAE.
          </p>
        </div>

        <div className="tp-house">
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
          <span aria-hidden="true" className="tp-house__lamp" />
          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img
                alt="Max, waiting inside"
                src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "53.8% 44.3%",
                }}
              />
            </span>
            <span aria-hidden="true" className="tp-house__door">
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />
          <span aria-hidden="true" className="tp-house__mat font-scrawl">
            welcome home
          </span>

          <div
            className="pup-stop tp-house__teddy"
            data-facing="right"
            data-pose="sit"
            data-pup-stop="true"
          >
            <PupBuddy pose="sit" facing="right" />
          </div>
        </div>

        <div className="tp-home__actions">
          <a
            className="btn btn-whatsapp"
            href={WA_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            Enquire on WhatsApp
          </a>
          <Link className="btn btn-ghost" to="/contact">
            Visit &amp; contact
          </Link>
        </div>
      </section>
    </div>
  );
}
