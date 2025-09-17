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
                    At DreamsLMS, we make education accessible to all with
                    interactive courses and expert-led content. Learn anytime,
                    anywhere, and achieve your goals seamlessly.
                  </p>
                </div>
                <div className="d-flex align-items-center about-us-banner">
                  <div>
                    <span className="bg-primary-transparent rounded-3 p-2 about-icon d-flex justify-content-center align-items-center">
                      <i className="isax isax-book-1 fs-24"></i>
                    </span>
                  </div>
                  <div className="ps-3">
                    <h6 className="mb-2">Learn from anywhere</h6>
                    <p>
                      Learning from anywhere has become a transform aspect of
                      modern education, allowing individuals.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center about-us-banner">
                  <div>
                    <span className="bg-secondary-transparent rounded-3 p-2 about-icon d-flex justify-content-center align-items-center">
                      <i className="isax isax-bookmark5 fs-24"></i>
                    </span>
                  </div>
                  <div className="ps-3">
                    <h6 className="mb-2">Expert Mentors</h6>
                    <p>
                      Expert mentors are invaluable assets in any field,
                      providing seasoned guidance knowledge.
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
            <h2>Master the Skills to Drive your Career</h2>
            <p>
              The right course, guided by an expert mentor, can provide
              invaluable insights, practical skills.
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
                    <i className="isax isax-book-1 fs-24"></i>
                  </div>
                  <h5 className="mt-3 mb-1">Flexible Learning</h5>
                  <p>
                    We believe that high-quality education should be accessible
                    to everyone. Our pricing form in models are designed.
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
                    <i className="isax isax-bookmark5 fs-24"></i>
                  </div>
                  <h5 className="mt-3 mb-1">Lifetime Access</h5>
                  <p>
                    When you enroll in our courses, you're not just signing up
                    for a temporary learning to experience you're making.
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
                    <i className="isax isax-chart-26 fs-24"></i>
                  </div>
                  <h5 className="mt-3 mb-1">Expert Instruction</h5>
                  <p>
                    Our instructors are seasoned professionals with years of
                    experience in their respective fields & Experts advice
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
                      <p>Online Courses</p>
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
                      <p>Expert Tutors</p>
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
                        <span className="count-digit">6</span>K+
                      </h4>
                      <p>Certified Courses</p>
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
                      <span className="count-digit">60</span>K+
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
                        What's DreamLMS want to give you?{" "}
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
                          DreamLMS aims to provide you with a comprehensive and
                          intuitive learning platform that enhances your
                          educational experience.
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
                        What's DreamLMS want to give you?{" "}
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
                          DreamLMS aims to provide you with a comprehensive and
                          intuitive learning platform that enhances your
                          educational experience.
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
