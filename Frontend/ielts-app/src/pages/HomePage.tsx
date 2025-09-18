import { Link } from "react-router-dom";
import HeroBanner from "../components/home/HeroBanner";
import BenefitsSection from "../components/home/BenefitsSection";
import InstitutionsSection from "../components/home/InstitutionsSection";
import TopCategoriesSection from "../components/home/TopCategoriesSection";
import TrustSection from "../components/home/TrustSection";
import FeaturedTestsSection from "../components/home/FeaturedTestsSection";
import CommunitySection from "../components/home/CommunitySection";
import useScriptInitialization from "../hooks/useScriptInitialization";

function HomePage() {
  // Initialize traditional scripts for animations and interactions
  // useScriptInitialization();

  return (
    <>
      <HeroBanner />
      <BenefitsSection />
      <InstitutionsSection />
      <TopCategoriesSection />
      <TrustSection />
      <FeaturedTestsSection />
      <CommunitySection />
    </>
  );
};

export default HomePage;
