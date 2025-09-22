import Card from "../utils/Card";
import BannerSearch from "./BannerSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { use, useEffect, useState } from "react";
import type { Test, TestWithAuthorName } from "../../types/Test";
import { getTests } from "../../services/testService";

function HeroBanner() {
  const [tests, setTests] = useState<TestWithAuthorName[]>([]);
  const fetchTests = async () => {
    const data = await getTests();
    setTests(data);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <section className="banner-section">
      <img
        className="img-fluid d-none d-lg-flex banner-bg1"
        src="/assets/img/bg/bg-15.png"
        alt="img"
      />
      <img
        className="img-fluid d-none d-lg-flex banner-bg2"
        src="/assets/img/bg/bg-16.png"
        alt="img"
      />
      <img
        className="img-fluid d-none d-lg-flex banner-bg3"
        src="/assets/img/bg/bg-17.png"
        alt="img"
      />
      <img
        className="img-fluid d-none d-lg-flex banner-bg4"
        src="/assets/img/bg/bg-18.png"
        alt="img"
      />
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-7 col-lg-7">
            <div className="banner-content pe-xxl-5">
              <span className="hero-title">The Leader in Online Learning</span>
              <h1 className="mb-4 text-white">
                Find the Best <span>IELTS TESTS</span> from the Best{" "}
                <span>SOURCES</span> Around the World
              </h1>
              <p className="fs-lg text-center text-md-start pb-2 pb-md-3 mb-4">
                Our specialized mock test platform are designed to bring the
                IELTS test experience to you, no matter where you are.
              </p>

              <BannerSearch />

              <div className="d-flex align-items-center gap-4 justify-content-lg-between justify-content-center flex-wrap">
                <div className="counter-item">
                  <div className="counter-icon flex-shrink-0">
                    <img src="/assets/img/icons/icon-32.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h5 className="text-purple">
                      <span className="count-digit">10</span>K
                    </h5>
                    <p>Mock Tests</p>
                  </div>
                </div>
                <div className="counter-item">
                  <div className="counter-icon flex-shrink-0">
                    <img src="/assets/img/icons/icon-33.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h5 className="text-skyblue">
                      <span className="count-digit">6</span>K
                    </h5>
                    <p>Official Tests</p>
                  </div>
                </div>
                <div className="counter-item">
                  <div className="counter-icon flex-shrink-0">
                    <img src="/assets/img/icons/icon-34.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h5 className="text-success">
                      <span className="count-digit">2</span>K
                    </h5>
                    <p>Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="banner-image">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="swiper-slider-banner"
              >
                {tests.map((test, idx) => (
                  <SwiperSlide key={idx}>
                    <Card
                      id={test.id}
                      title={test.testName}
                      attemptCount={test.submissionCount}
                      questionCount={40}
                      type={test.typeName}
                      timeMinutes={test.typeName === "Listening" ? 40 : 60}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
