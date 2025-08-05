import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <section className="banner-section">
      <img className="img-fluid d-none d-lg-flex banner-bg1" src="/assets/img/bg/bg-15.png" alt="img" />
      <img className="img-fluid d-none d-lg-flex banner-bg2" src="/assets/img/bg/bg-16.png" alt="img" />
      <img className="img-fluid d-none d-lg-flex banner-bg3" src="/assets/img/bg/bg-17.png" alt="img" />
      <img className="img-fluid d-none d-lg-flex banner-bg4" src="/assets/img/bg/bg-18.png" alt="img" />
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-7 col-lg-7">
            <div className="banner-content pe-xxl-5">
              <span className="hero-title">The Leader in Online Learning</span>
              <h1 className="mb-4 text-white">
                Find the Best <span>Courses</span> from the Best <span>Mentors</span> Around the World
              </h1>
              <p className="fs-lg text-center text-md-start pb-2 pb-md-3 mb-4">
                Our specialized online courses are designed to bring the classroom experience to you, no matter where you are.
              </p>

              <form className="banner-search" action="/course-list">
                <div className="dropdown">
                  <a className="hero-dropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Category <i className="isax isax-arrow-down5 fs-12"></i>
                  </a>
                  <ul className="dropdown-menu p-1">
                    <li><a className="dropdown-item" href="#">Design</a></li>
                    <li><a className="dropdown-item" href="#">Programming</a></li>
                    <li><a className="dropdown-item" href="#">Marketing</a></li>
                  </ul>
                </div>
                <input 
                  type="text" 
                  name="search" 
                  className="border-0 form-control p-0"
                  placeholder="Search for Courses, Instructors" 
                />
                <button type="submit" className="btn btn-secondary ms-auto">
                  <i className="isax isax-arrow-right-1"></i>
                </button>
              </form>

              <div className="d-flex align-items-center gap-4 justify-content-lg-between justify-content-center flex-wrap">
                <div className="counter-item">
                  <div className="counter-icon flex-shrink-0">
                    <img src="/assets/img/icons/icon-32.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h5 className="text-purple"><span className="count-digit">10</span>K</h5>
                    <p>Online Courses</p>
                  </div>
                </div>
                <div className="counter-item">
                  <div className="counter-icon flex-shrink-0">
                    <img src="/assets/img/icons/icon-33.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h5 className="text-skyblue"><span className="count-digit">6</span>K</h5>
                    <p>Certified Courses</p>
                  </div>
                </div>
                <div className="counter-item">
                  <div className="counter-icon flex-shrink-0">
                    <img src="/assets/img/icons/icon-34.svg" alt="img" />
                  </div>
                  <div className="count-content">
                    <h5 className="text-success"><span className="count-digit">2</span>K</h5>
                    <p>Experienced Tutors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="banner-image">
              <div className="swiper swiper-slider-banner">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="course-item-two course-item mb-0">
                      <div className="course-img">
                        <img src="/assets/img/course/course-22.jpg" alt="img" className="img-fluid" />
                        <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
                          <a href="javascript:void(0);" className="fav-icon">
                            <i className="isax isax-heart"></i>
                          </a>
                          <a href="javascript:void(0);" className="brand-icon ms-auto">
                            <img src="/assets/img/icons/course-01.svg" alt="img" className="img-fluid" />
                          </a>
                        </div>
                      </div>
                      <div className="course-content">
                        <div className="d-flex justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <a href="javascript:void(0);" className="avatar avatar-sm">
                              <img src="/assets/img/user/user-50.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                            </a>
                            <div className="ms-2">
                              <a href="javascript:void(0);" className="link-default fs-14">David Benitz</a>
                            </div>
                          </div>
                          <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium">
                            Productivity
                          </span>
                        </div>
                        <h6 className="mb-2">
                          <Link to="/course-details">The Complete Business and Management Course</Link>
                        </h6>
                        <p className="d-flex align-items-center mb-3">
                          <i className="ti ti-star-filled text-warning me-2"></i>5.0 (210 Reviews)
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="text-secondary fs-16 fw-semi-bold mb-0">$168</h6>
                          <Link to="/cart" className="btn btn-dark btn-sm d-inline-flex align-items-center">
                            Add to Cart<i className="isax isax-arrow-right-3 ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="course-item course-item-two mb-0">
                      <div className="course-img">
                        <img src="/assets/img/course/course-25.jpg" alt="img" className="img-fluid" />
                        <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
                          <a href="javascript:void(0);" className="fav-icon">
                            <i className="isax isax-heart"></i>
                          </a>
                          <a href="javascript:void(0);" className="brand-icon ms-auto">
                            <img src="/assets/img/featured-courses/Clip-path-group.svg" alt="img" className="img-fluid" />
                          </a>
                        </div>
                      </div>
                      <div className="content-course">
                        <div className="d-flex justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <a href="javascript:void(0);" className="avatar avatar-sm">
                              <img src="/assets/img/user/user-20.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                            </a>
                            <div className="ms-2">
                              <a href="javascript:void(0);" className="link-default fs-14">Edith Dorsey</a>
                            </div>
                          </div>
                          <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium">
                            Lifestyles
                          </span>
                        </div>
                        <h6 className="mb-2">
                          <Link to="/course-details">Build Creative Arts & media Course Completed</Link>
                        </h6>
                        <p className="d-flex align-items-center mb-3">
                          <i className="ti ti-star-filled text-warning me-2"></i>4.9 (178 Reviews)
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="text-secondary fs-16 fw-semi-bold mb-0">$190</h6>
                          <Link to="/cart" className="btn btn-dark btn-sm d-inline-flex align-items-center">
                            Add to Cart<i className="isax isax-arrow-right-3 ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="course-item course-item-two mb-0">
                      <div className="course-img">
                        <img src="/assets/img/course/course-24.jpg" alt="img" className="img-fluid" />
                        <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
                          <a href="javascript:void(0);" className="fav-icon">
                            <i className="isax isax-heart"></i>
                          </a>
                          <a href="javascript:void(0);" className="brand-icon ms-auto">
                            <img src="/assets/img/featured-courses/react.svg" alt="img" className="img-fluid" />
                          </a>
                        </div>
                      </div>
                      <div className="content-course">
                        <div className="d-flex justify-content-between mb-2">
                          <div className="d-flex align-items-center">
                            <a href="javascript:void(0);" className="avatar avatar-sm">
                              <img src="/assets/img/user/user-23.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                            </a>
                            <div className="ms-2">
                              <a href="javascript:void(0);" className="link-default fs-14">Calvin Johnsen</a>
                            </div>
                          </div>
                          <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium">
                            Development
                          </span>
                        </div>
                        <h6 className="mb-2">
                          <Link to="/course-details">Learn & Create ReactJS Tech Fundamentals Apps</Link>
                        </h6>
                        <p className="d-flex align-items-center mb-3">
                          <i className="ti ti-star-filled text-warning me-2"></i>5.0 (154 Reviews)
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="text-secondary fs-16 fw-semi-bold mb-0">$147</h6>
                          <Link to="/cart" className="btn btn-dark btn-sm d-inline-flex align-items-center">
                            Add to Cart<i className="isax isax-arrow-right-3 ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
