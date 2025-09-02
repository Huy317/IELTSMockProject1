import { NavLink, Link } from 'react-router-dom';
import '../../assets/css/custom.css';
function Header() {
  return (
    <header className="header-two">
      <div className="container">
        <div className="header-nav">
          <div className="navbar-header">
            <a id="mobile_btn" href="#">
              <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <div className="navbar-logo">
              <Link className="logo-white header-logo" to="/">
                <img src="/assets/img/logo.svg" className="logo" alt="Logo" />
              </Link>
              <Link className="logo-dark header-logo" to="/">
                <img src="/assets/img/logo-white.svg" className="logo" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
              </Link>
              <a id="menu_close" className="menu-close" href="#">
                <i className="fas fa-times"></i>
              </a>
            </div>
            <ul className="main-nav">
              <li className="">
                {/* <a href="/">Home</a> */}
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>
              <li className="has-submenu">
                <a href="#">
                  Tests <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="submenu">
                  <li>
                    {/* <a href="/course-grid">Course Grid</a> */}
                    <NavLink to="/test/list" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Test List
                    </NavLink>
                  </li>
                  {/* <li><Link to="/course-resume">Course Resume</Link></li> */}
                </ul>
              </li>
              <li className="has-submenu">
                <a href="#">
                  Dashboard <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="submenu">
                  <li className="has-submenu">
                    <a href="#">Instructor Dashboard</a>
                    <ul className="submenu">
                      <li><Link to="/admin/dashboard">Dashboard</Link></li>
                      <li><Link to="/admin/profile">My Profile</Link></li>
                      <li><Link to="/admin/courses">Courses</Link></li>
                      <li><Link to="/admin/users">User List</Link></li>
                      <li><Link to="/admin/settings">Settings</Link></li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <a href="#">Student Dashboard</a>
                    <ul className="submenu">
                      <li><Link to="/student/dashboard">Dashboard</Link></li>
                      <li><Link to="/student/profile">My Profile</Link></li>
                      <li><Link to="/student/courses">Courses</Link></li>
                      <li><Link to="/student/settings">Settings</Link></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="has-submenu">
                <a href="#">
                  Pages <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="submenu">
                  <li className="active"><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/contact-us">Contact us</Link></li>
                  <li className="has-submenu">
                    <a href="#">Authentication</a>
                    <ul className="submenu">
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                      <li><Link to="/forgot-password">Forgot Password</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </li>
            </ul>

            <div className="menu-dropdown">
              <div className="dropdown flag-dropdown mb-2">
                <a 
                  href="#" 
                  className="dropdown-toggle d-flex align-items-center"
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

              <div className="dropdown mb-2">
                <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Light
                </a>
                <ul className="dropdown-menu p-2 mt-2">
                  <li><a className="dropdown-item rounded" href="#">Light</a></li>
                  <li><a className="dropdown-item rounded" href="#">Dark</a></li>
                </ul>
              </div>
            </div>
            <div className="menu-login">
              <Link to="/login" className="btn btn-primary w-100 mb-2">
                <i className="isax isax-user me-2"></i>Sign In
              </Link>
              <Link to="/register" className="btn btn-secondary w-100">
                <i className="isax isax-user-edit me-2"></i>Register
              </Link>
            </div>
          </div>
          <div className="header-btn d-flex align-items-center">
            <div className="icon-btn me-2">
              <a href="#" id="dark-mode-toggle" className="theme-toggle activate">
                <i className="isax isax-sun-15"></i>
              </a>
              <a href="#" id="light-mode-toggle" className="theme-toggle">
                <i className="isax isax-moon"></i>
              </a>
            </div>

            <Link to="/login" className="btn btn-light d-inline-flex align-items-center me-2">
              <i className="isax isax-lock-circle me-2"></i>Sign In
            </Link>
            <Link to="/register" className="btn btn-secondary me-0">
              <i className="isax isax-user-edit me-2"></i>Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

