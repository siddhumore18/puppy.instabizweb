import { WA_LINK } from "./Header";

export default function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <a
          className="btn btn-whatsapp !min-h-[2.85rem] !px-4 !text-[0.95rem]"
          href={WA_LINK}
          rel="noopener noreferrer"
          target="_blank"
        >
          WhatsApp us
        </a>
        <a
          className="btn btn-ghost !min-h-[2.85rem] !px-4 !text-[0.95rem]"
          href="tel:+971500000000"
        >
          Call
        </a>
      </div>
    </div>
  );
}
