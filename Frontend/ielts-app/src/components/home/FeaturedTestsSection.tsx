import { Link } from "react-router-dom";
import Card from "../utils/Card";
import Slider from "react-slick";
import { use, useEffect, useState } from "react";
import type { Test, TestWithAuthorName } from "../../types/Test";
import { getPopularTests, getTests } from "../../services/testService";
import { get } from "react-hook-form";

function FeaturedTestsSection() {
  const [tests, setTests] = useState<TestWithAuthorName[]>([]);

  const fetchPopularTests = async () => {
    // write new api to get popular tests base on number of submissions
    const data = await getPopularTests();
    setTests(data);
  };

  useEffect(() => {
    fetchPopularTests();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="featured-courses-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
            Featured Tests
          </span>
          <h2>Popular IELTS Mock Tests</h2>
          <p>
            Try our most popular mock tests to improve your IELTS skills and
            build confidence for the real exam
          </p>
        </div>
        <div className="feature-course-slider-2">
          <Slider {...sliderSettings}>
            {tests.map((test, idx) => (
              <div key={idx}>
                <Card
                  id={test.id}
                  title={test.testName}
                  attemptCount={test.submissionCount}
                  questionCount={40}
                  type={test.typeName}
                  timeMinutes={
                    (test.typeName === "Listening" ? 40 : 60)
                  }
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Link to="/test/list" className="btn btn-primary btn-md">
            View All Tests
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedTestsSection;
