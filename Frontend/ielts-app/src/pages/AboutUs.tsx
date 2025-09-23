import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">About Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section-two pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-3 p-sm-4 position-relative">
                <div className="position-absolute top-0 start-0 z-n1">
                  <img src="/assets/img/shapes/shape-1.svg" alt="img" />
                </div>
                <div className="position-absolute bottom-0 end-0 z-n1">
                  <img src="/assets/img/shapes/shape-2.svg" alt="img" />
                </div>
                <div className="position-absolute bottom-0 start-0 mb-md-5 ms-md-n5">
                  <img src="/assets/img/icons/icon-1.svg" alt="img" />
                </div>
                <img
                  className="img-fluid img-radius"
                  src="/assets/img/about/about-2.svg"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-0 ps-lg-2 pt-4 pt-lg-0 ps-xl-5">
                <div className="section-header">
                  <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
                    About
                  </span>
                  <h2>Empowering Learning, Inspiring Growth</h2>
                  <p>
                    Our specialized mock test platform are designed to bring the
                    IELTS test experience to you, no matter where you are.
                  </p>
                </div>
                <div className="d-flex align-items-center about-us-banner">
                  <div>
                    <span className="bg-primary-transparent rounded-3 p-2 about-icon d-flex justify-content-center align-items-center">
                      <i className="isax isax-global fs-24"></i>
                    </span>
                  </div>
                  <div className="ps-3">
                    <h6 className="mb-2">Practice Anywhere, Anytime</h6>
                    <p>
                      Access unlimited IELTS mock tests from any device,
                      anywhere in the world. Practice at your own pace and
                      convenience.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center about-us-banner">
                  <div>
                    <span className="bg-secondary-transparent rounded-3 p-2 about-icon d-flex justify-content-center align-items-center">
                      <i className="isax isax-teacher fs-24"></i>
                    </span>
                  </div>
                  <div className="ps-3">
                    <h6 className="mb-2">Expert-Designed Content</h6>
                    <p>
                      Our mock tests are created by experienced IELTS
                      instructors and follow the official test format and
                      difficulty levels.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center about-us-banner">
                  <div>
                    <span className="bg-secondary-transparent rounded-3 p-2 about-icon d-flex justify-content-center align-items-center">
                      <i className="isax isax-chart-success fs-24"></i>
                    </span>
                  </div>
                  <div className="ps-3">
                    <h6 className="mb-2">Track Your Progress</h6>
                    <p>
                      Monitor your improvement with detailed performance
                      analytics and get personalized recommendations for better
                      scores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefit-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
              Our Benefits
            </span>
            <h2>Your Pathway to IELTS Excellence</h2>
            <p>
              Prepare with authentic practice, expert guidance, and the tools
              you need to score higher.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="position-absolute top-0 end-0 mt-n3 me-n4">
                    <img src="/assets/img/shapes/bg-1.png" alt="img" />
                  </div>
                  <div className="p-4 rounded-pill bg-primary-transparent d-inline-flex">
                    <i className="isax isax-star5 fs-24"></i>
                  </div>
                  <h5 className="mt-3 mb-1">Completely Free</h5>
                  <p>
                    Access unlimited IELTS mock tests without any cost. No
                    hidden fees, no subscriptions - just free, high-quality
                    practice tests for everyone.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="position-absolute top-0 end-0 mt-n3 me-n4">
                    <img src="/assets/img/shapes/bg-2.png" alt="img" />
                  </div>
                  <div className="p-4 rounded-pill bg-secondary-transparent d-inline-flex">
                    <i className="isax isax-task-square5 fs-24"></i>
                  </div>
                  <h5 className="mt-3 mb-1">Authentic Test Format</h5>
                  <p>
                    Experience real IELTS test conditions with authentic
                    question types, timing, and difficulty levels to prepare you
                    for the actual exam.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="position-absolute top-0 end-0 mt-n3 me-n4">
                    <img src="/assets/img/shapes/bg-3.png" alt="img" />
                  </div>
                  <div className="p-4 rounded-pill bg-skyblue-transparent d-inline-flex">
                    <i className="isax isax-chart-21 fs-24"></i>
                  </div>
                  <h5 className="mt-3 mb-1">Instant Results & Feedback</h5>
                  <p>
                    Get immediate scoring and detailed feedback on your
                    performance with personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="counter-sec">
        <div className="container">
          <div className="row gy-3">
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="counter-icon">
                      <img
                        src="/assets/img/icons/counter-icon1.svg"
                        alt="img"
                      />
                    </div>
                    <div className="count-content">
                      <h4 className="text-info">
                        <span className="count-digit">10</span>K
                      </h4>
                      <p>Mock Tests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="counter-icon">
                      <img
                        src="/assets/img/icons/counter-icon2.svg"
                        alt="img"
                      />
                    </div>
                    <div className="count-content">
                      <h4 className="text-warning">
                        <span className="count-digit">200</span>+
                      </h4>
                      <p>Instructors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="counter-icon">
                      <img
                        src="/assets/img/icons/counter-icon3.svg"
                        alt="img"
                      />
                    </div>
                    <div className="count-content">
                      <h4 className="text-skyblue">
                        <span className="count-digit">6</span>K
                      </h4>
                      <p>Official Tests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card border-0 mb-0">
                <div className="card-body d-flex align-items-center">
                  <div className="counter-icon">
                    <img src="/assets/img/icons/counter-icon4.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h4 className="text-lightgreen">
                      <span className="count-digit">2</span>K
                    </h4>
                    <p>Online Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 pe-md-5">
              <div className="position-relative">
                <img
                  className="img-fluid rounded-4"
                  src="/assets/img/about/about-1.jpg"
                  alt="img"
                />
                <div className="bg-warning text-center p-3 rounded-5 position-absolute top-0 end-0 z-index-1 d-none d-sm-block my-3 mx-3">
                  <i className="isax isax-message-question5 heading-color fs-46"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-header">
                <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
                  FAQs
                </span>
                <h2>Frequently Asked Questions</h2>
                <p>
                  Explore detailed answers to the most common questions about
                  our platform.
                </p>
              </div>
              <div className="faq-content">
                <div
                  className="accordion accordion-customicon1 accordions-items-seperate"
                  id="accordioncustomicon1Example"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingcustomicon1One">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsecustomicon1One"
                        aria-expanded="true"
                        aria-controls="collapsecustomicon1One"
                      >
                        What's IELTS Mock want to give you?{" "}
                        <i className="isax isax-add fs-20 fw-semibold ms-1"></i>
                      </button>
                    </h2>
                    <div
                      id="collapsecustomicon1One"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingcustomicon1One"
                      data-bs-parent="#accordioncustomicon1Example"
                    >
                      <div className="accordion-body pt-0">
                        <p>
                          Our website gives you access to IELTS practice tests,
                          study resources, and personalized learning tools that
                          help you prepare effectively and build confidence for
                          your exam.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingcustomicon1One">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsecustomicon1One"
                        aria-expanded="true"
                        aria-controls="collapsecustomicon1One"
                      >
                        How does IELTS Mock improve your learning experience?{" "}
                        <i className="isax isax-add fs-20 fw-semibold ms-1"></i>
                      </button>
                    </h2>
                    <div
                      id="collapsecustomicon1One"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingcustomicon1One"
                      data-bs-parent="#accordioncustomicon1Example"
                    >
                      <div className="accordion-body pt-0">
                        <p>
                          Our website improves your learning experience with
                          interactive practice tests, instant feedback, and
                          personalized study plans that make IELTS preparation
                          more effective and engaging.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Add more FAQ items similarly */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
