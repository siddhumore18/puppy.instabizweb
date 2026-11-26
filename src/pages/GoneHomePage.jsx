import { Link } from "react-router-dom";
import { ALL_PUPPIES } from "../data/puppies";
import PawIcon from "../components/PawIcon";

export default function GoneHomePage() {
  const rehomed = ALL_PUPPIES.filter((p) => p.status === "rehomed");
  const list = rehomed.length > 0 ? rehomed : ALL_PUPPIES.slice(0, 12);

  return (
    <div className="gutter mx-auto max-w-[110rem] py-12 md:py-16">
      <header className="tp-page-head">
        <div>
          <p className="font-scrawl text-lg text-toffee">loved &amp; settled</p>
          <h1 className="font-plush text-huge mt-1">Gone home</h1>
        </div>
        <p className="text-lede max-w-[44ch] text-cocoa-soft">
          Puppies who have already found their forever families through TeddyPups U.A.E.
        </p>
      </header>

      <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((pup) => (
          <li key={pup.slug} className="tp-door mx-auto" data-open="true">
            <Link
              className="tp-door__link"
              to={`/puppies/${pup.slug}`}
              style={{ "--door": pup.doorColor }}
            >
              <span className="tp-door__plate">
                <span className="font-plush tp-door__name">{pup.displayName}</span>
                <span className="tp-door__meta">
                  {pup.breed}, {pup.genderLabel}
                </span>
              </span>
              <span className="tp-door__frame">
                <span className="tp-door__room">
                  {pup.cover && (
                    <img
                      alt={pup.displayName}
                      src={pup.cover}
                      loading="lazy"
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
                <span className="tp-door__tag font-scrawl">Gone home</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
