import { useState } from "react";
import { HAPPY_FAMILIES_PHOTOS } from "../data/happyFamilies";
import PawIcon from "../components/PawIcon";
import PhotoLightbox from "../components/PhotoLightbox";
import { WA_LINK } from "../components/Header";

export default function HappyFamiliesPage() {
  const [viewerIdx, setViewerIdx] = useState(null);

  return (
    <div data-page="families" className="tp-page">
      <section className="tp-memories gutter mx-auto max-w-[110rem] py-12 md:py-16">
        <header className="tp-memories__head">
          <div>
            <p className="font-scrawl text-lg text-toffee">home, at last</p>
            <h1 className="tp-memories__title font-plush text-huge mt-1">Happy families</h1>
          </div>
          <p className="tp-memories__note text-lede max-w-[46ch] text-cocoa-soft">
            Heartwarming moments shared by families who welcomed a TeddyPups puppy into their homes
            and hearts.
          </p>
        </header>

        <ul className="tp-wall mt-12" aria-label="Photos from TeddyPups families">
          {HAPPY_FAMILIES_PHOTOS.map((photo, idx) => (
            <li key={photo.id} className="tp-wall__item" data-reveal="true">
              <button
                type="button"
                className="tp-wall__print"
                onClick={() => setViewerIdx(idx)}
                aria-label={`Open photo ${idx + 1} of ${HAPPY_FAMILIES_PHOTOS.length}${
                  photo.caption ? `: ${photo.caption}` : ""
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading={idx < 8 ? "eager" : "lazy"}
                  className="h-full w-full rounded-xl object-cover"
                />
                <PawIcon className="tp-wall__paw" />
              </button>
            </li>
          ))}
        </ul>

        <div className="tp-memories__foot mt-16 text-center">
          <p className="font-scrawl text-xl text-toffee">ready to write your own story?</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <PhotoLightbox
        photos={HAPPY_FAMILIES_PHOTOS}
        index={viewerIdx}
        onChangeIndex={setViewerIdx}
        onClose={() => setViewerIdx(null)}
      />
    </div>
  );
}
