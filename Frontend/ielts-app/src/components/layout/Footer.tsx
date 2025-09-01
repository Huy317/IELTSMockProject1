import { Link } from 'react-router-dom';

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
                  Comprehensive IELTS mock test platform designed to help students prepare for the International English Language Testing System exam with realistic practice tests and detailed performance analytics.
                </p>
                {/* <div className="d-flex align-items-center">
                  <Link to="#" className="me-2">
                    <img src="/assets/img/icon/appstore.svg" alt="" />
                  </Link>
                  <Link to="#">
                    <img src="/assets/img/icon/googleplay.svg" alt="" />
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row row-gap-4">
                {/* <div className="col-lg-3">
                  <div className="footer-widget footer-menu">
                    <h5 className="footer-title">For Instructor</h5>
                    <ul>
                      <li><Link to="/course-grid">Search Mentors</Link></li>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/course-list">Booking</Link></li>
                      <li><Link to="/student-dashboard">Students Dashboard</Link></li>
                    </ul>
                  </div>
                </div> */}
                <div className="col-lg-3">
                  <div className="footer-widget footer-menu">
                    <h5 className="footer-title">For Student</h5>
                    <ul>
                      <li><Link to="/test/list">Tests List</Link></li>
                      <li><Link to="/student/dashboard">Dashboard</Link></li>
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/student/settings">Settings</Link></li>
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
                          81 Nam Kỳ Khởi Nghĩa, Phường Bình Dương, <br /> Thành phố, Hồ Chí Minh
                        </p>
                      </div>
                      <div className="footer-address d-flex align-items-center">
                        <img 
                          src="/assets/img/icon/icon-19.svg" 
                          alt="Img"
                          className="img-fluid me-2"
                        />
                        <p>
                          <Link to="mailto:info@example.com">info@example.com</Link>
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
                <p className="text-white">Copyright &copy; 2025 IELTS-MOCK. All rights reserved.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <ul className="d-flex align-items-center justify-content-center justify-content-md-end footer-link">
                  <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
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
