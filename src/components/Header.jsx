import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PawIcon from "./PawIcon";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/puppies", label: "Puppies" },
  { to: "/happy-families", label: "Happy families" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Visit & contact" },
];

export const WA_LINK =
  "https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project.";

export default function Header() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 120 && y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6 || y <= 80) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const openMenu = () => {
    dialogRef.current?.showModal();
  };

  const closeMenu = () => {
    dialogRef.current?.close();
  };

  return (
    <header
      id="site-header"
      className="tp-header fixed inset-x-0 top-0 z-50"
      data-hidden={hidden ? "true" : "false"}
      data-home={isHome ? "true" : "false"}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <div className="tp-header__bar gutter">
        <Link aria-label="TeddyPups U.A.E. — home" className="tp-header__brand" to="/">
          <img
            alt=""
            className="tp-header__logo"
            height={56}
            width={56}
            src="/brand/logo.png"
          />
          <span className="font-plush tp-header__name">TeddyPups</span>
        </Link>

        <nav aria-label="Main" className="tp-header__nav">
          <ul>
            {NAV_LINKS.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className="tp-nav-link"
                    data-active={active ? "true" : "false"}
                    to={item.to}
                  >
                    <span>{item.label}</span>
                    <PawIcon className="tp-nav-link__paw" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="tp-header__end">
          <a
            className="btn btn-whatsapp tp-header__wa"
            href={WA_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp us
          </a>

          <button
            aria-haspopup="dialog"
            className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden"
            type="button"
            onClick={openMenu}
          >
            <PawIcon className="size-4" />
            Menu
          </button>

          <dialog
            ref={dialogRef}
            aria-label="Site menu"
            className="tp-menu m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa backdrop:bg-cocoa/40"
            onClick={(e) => {
              if (e.target === dialogRef.current) closeMenu();
            }}
          >
            <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-center justify-between">
                <span className="font-scrawl text-lg">where to, friend?</span>
                <button
                  className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk"
                  type="button"
                  onClick={closeMenu}
                >
                  Close
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-10 flex-1">
                <ul className="space-y-1">
                  {NAV_LINKS.map((item) => {
                    const active =
                      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    return (
                      <li key={item.to}>
                        <Link
                          aria-current={active ? "page" : undefined}
                          className="tp-menu-link font-plush block py-2 text-[clamp(2.4rem,11vw,3.4rem)]"
                          data-active={active ? "true" : "false"}
                          to={item.to}
                          onClick={closeMenu}
                        >
                          <span>{item.label}</span>
                          <PawIcon className="tp-nav-link__paw" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-cocoa/15 pt-5">
                <a
                  className="btn btn-whatsapp"
                  href={WA_LINK}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  WhatsApp us
                </a>
                <a className="font-semibold text-cocoa underline" href="tel:+971500000000">
                  +971 50 000 0000
                </a>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <svg aria-hidden="true" className="tp-header__hem" height="14" preserveAspectRatio="none" width="100%">
        <defs>
          <pattern height="14" id="tp-hem" patternUnits="userSpaceOnUse" width="44">
            <path className="tp-header__hem-fill" d="M0 0H44V2A22 11 0 0 1 0 2Z" />
            <path className="tp-header__hem-line" d="M0 2A22 11 0 0 0 44 2" />
          </pattern>
        </defs>
        <rect fill="url(#tp-hem)" height="14" width="100%" />
      </svg>
    </header>
  );
}
