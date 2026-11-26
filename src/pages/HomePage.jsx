import HeroSection from "../components/home/HeroSection";
import MeetThePupsSection from "../components/home/MeetThePupsSection";
import TwoWaysSection from "../components/home/TwoWaysSection";
import JourneySection from "../components/home/JourneySection";
import PassportSection from "../components/home/PassportSection";
import HappyFamiliesSection from "../components/home/HappyFamiliesSection";
import FaqSection from "../components/home/FaqSection";
import ReadyCtaSection from "../components/home/ReadyCtaSection";

export default function HomePage() {
  return (
    <div className="tp-page">
      <HeroSection />
      <MeetThePupsSection />
      <TwoWaysSection />
      <JourneySection />
      <PassportSection />
      <HappyFamiliesSection />
      <FaqSection />
      <ReadyCtaSection />
    </div>
  );
}
