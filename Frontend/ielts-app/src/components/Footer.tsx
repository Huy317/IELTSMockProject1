import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <img src="/assets/img/bg/footer-bg-01.png" className="footer-bg-1" alt="" />
        <img src="/assets/img/bg/footer-bg-02.png" className="footer-bg-2" alt="" />
      </div>
      <div className="footer-top">
        <div className="container">
          <div className="row row-gap-4">
            <div className="col-lg-4">
              <div className="footer-about">
                <div className="footer-logo">
                  <img src="/assets/img/logo.svg" alt="" />
                </div>
                <p>
                  Platform designed to help organizations, educators, and learners manage, deliver, and
                  track learning and training activities.
                </p>
                <div className="d-flex align-items-center">
                  <a href="#" className="me-2">
                    <img src="/assets/img/icon/appstore.svg" alt="" />
                  </a>
                  <a href="#">
                    <img src="/assets/img/icon/googleplay.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row row-gap-4">
                <div className="col-lg-3">
                  <div className="footer-widget footer-menu">
                    <h5 className="footer-title">For Instructor</h5>
                    <ul>
                      <li><a href="/course-grid">Search Mentors</a></li>
                      <li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>
                      <li><a href="/course-list">Booking</a></li>
                      <li><a href="/student-dashboard">Students Dashboard</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="footer-widget footer-menu">
                    <h5 className="footer-title">For Student</h5>
                    <ul>
                      <li><a href="#">Appointments</a></li>
                      <li><a href="/instructor-message">Chat</a></li>
                      <li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>
                      <li><a href="/instructor-dashboard">Instructor Dashboard</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="footer-widget footer-contact">
                    <h5 className="footer-title">Newsletter</h5>
                    <div className="subscribe-input">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input 
                          type="email" 
                          className="form-control"
                          placeholder="Enter your Email Address"
                        />
                        <button 
                          type="submit"
                          className="btn btn-primary btn-sm inline-flex align-items-center"
                        >
                          <i className="isax isax-send-2 me-1"></i>Subscribe
                        </button>
                      </form>
                    </div>
                    <div className="footer-contact-info">
                      <div className="footer-address d-flex align-items-center">
                        <img 
                          src="/assets/img/icon/icon-20.svg" 
                          alt="Img"
                          className="img-fluid me-2"
                        />
                        <p>
                          3556 Beech Street, San Francisco,<br /> California, CA 94108
                        </p>
                      </div>
                      <div className="footer-address d-flex align-items-center">
                        <img 
                          src="/assets/img/icon/icon-19.svg" 
                          alt="Img"
                          className="img-fluid me-2"
                        />
                        <p>
                          <a href="mailto:info@example.com">info@example.com</a>
                        </p>
                      </div>
                      <div className="footer-address d-flex align-items-center">
                        <img 
                          src="/assets/img/icon/icon-21.svg" 
                          alt="Img"
                          className="img-fluid me-2"
                        />
                        <p>+19 123-456-7890</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row row-gap-2">
            <div className="col-md-6">
              <div className="text-center text-md-start">
                <p className="text-white">Copyright &copy; 2025 DreamsLMS. All rights reserved.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <ul className="d-flex align-items-center justify-content-center justify-content-md-end footer-link">
                  <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
                  <li><a href="/privacy-policy">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
