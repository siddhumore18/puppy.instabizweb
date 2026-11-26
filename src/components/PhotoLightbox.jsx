import { useEffect, useRef } from "react";

export default function PhotoLightbox({ photos, index, onChangeIndex, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) {
      dlg.showModal();
    } else if (index === null && dlg.open) {
      dlg.close();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") onChangeIndex((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onChangeIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onChangeIndex]);

  const current = index !== null ? photos[index] : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {current && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <p className="font-scrawl text-lg">
              {index + 1} / {photos.length}
              {current.caption ? ` — ${current.caption}` : ""}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa"
            >
              Close
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
            <img
              src={current.url}
              alt={current.alt || current.caption || "Happy TeddyPups family"}
              className="max-h-full max-w-full rounded-xl object-contain"
            />
          </div>
          <div className="flex justify-center gap-4 px-4 pb-5">
            <button
              type="button"
              onClick={() => onChangeIndex((index - 1 + photos.length) % photos.length)}
              className="h-11 rounded-full border-2 border-milk/40 px-6 font-semibold text-milk hover:border-honey hover:text-honey"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onChangeIndex((index + 1) % photos.length)}
              className="h-11 rounded-full bg-honey px-6 font-semibold text-cocoa hover:bg-honey-soft"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
