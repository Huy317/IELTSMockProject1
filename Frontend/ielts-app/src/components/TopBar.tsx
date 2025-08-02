function TopBar() {
  return (
    <div className="header-topbar text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
              <p className="d-flex align-items-center fw-medium fs-14 mb-2 me-3">
                <i className="isax isax-location5 me-2"></i>
                1442 Crosswind Drive Madisonville
              </p>
              <p className="d-flex align-items-center fw-medium fs-14 mb-2">
                <i className="isax isax-call-calling5 me-2"></i>
                +1 45887 77874
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-end">
              <div className="dropdown flag-dropdown mb-2 me-3">
                <a 
                  href="#" 
                  className="dropdown-toggle d-inline-flex align-items-center"
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <img src="/assets/img/flags/us-flag.svg" className="me-2" alt="flag" />
                  ENG
                </a>
                <ul className="dropdown-menu p-2 mt-2">
                  <li>
                    <a className="dropdown-item rounded d-flex align-items-center" href="#">
                      <img src="/assets/img/flags/us-flag.svg" className="me-2" alt="flag" />
                      ENG
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item rounded d-flex align-items-center" href="#">
                      <img src="/assets/img/flags/vn-flag.svg" className="me-2" alt="flag" />
                      VN
                    </a>
                  </li>
                </ul>
              </div>

              <ul className="social-icon d-flex align-items-center mb-2">
                <li className="me-2">
                  <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                </li>
                <li className="me-2">
                  <a href="#"><i className="fa-brands fa-youtube"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;