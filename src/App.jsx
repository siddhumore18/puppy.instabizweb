import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomBar from "./components/MobileBottomBar";
import PupDirector from "./components/PupDirector";
import CursorPawTrail from "./components/CursorPawTrail";
import HomePage from "./pages/HomePage";
import PuppiesPage from "./pages/PuppiesPage";
import PuppyDetailPage from "./pages/PuppyDetailPage";
import HappyFamiliesPage from "./pages/HappyFamiliesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import GoneHomePage from "./pages/GoneHomePage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-cocoa px-5 py-3 font-semibold text-milk"
        href="#main"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puppies" element={<PuppiesPage />} />
          <Route path="/puppies/:slug" element={<PuppyDetailPage />} />
          <Route path="/happy-families" element={<HappyFamiliesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gone-home" element={<GoneHomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <PupDirector />
      </main>

      <Footer />
      <MobileBottomBar />
      <CursorPawTrail />
    </BrowserRouter>
  );
}
