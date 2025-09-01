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
      
      {/* Temporary content - will be replaced with more sections */}
      {/* <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2>More sections coming soon...</h2>
              <p>Hero Banner, Benefits, Institutions, Test Categories, Trust, Featured Tests, Community, and How It Works sections are now React components!</p>
              <Link to="/course-grid" className="btn btn-primary me-2">Go to Course Grid</Link>
              <Link to="/admin" className="btn btn-secondary">Go to Admin Page</Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
