import { NavLink, Link } from "react-router-dom";
import "../../assets/css/custom.css";
import { useAuth } from "../../contexts/AuthContext";
function Header() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
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
                <img
                  src="/assets/img/logo-white.svg"
                  className="logo"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img
                  src="/assets/img/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <a id="menu_close" className="menu-close" href="#">
                <i className="fas fa-times"></i>
              </a>
            </div>

            {user?.role === "Admin" ? (
              <>
                <ul className="main-nav">
                  <li className=""></li>
                </ul>
              </>
            ) : (
              <>
                <ul className="main-nav">
                  <li className="">
                    <NavLink
                      to="/"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/test/list"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Exams
                    </NavLink>
                  </li>
                  {/* <li className="has-submenu">
                <a href="#">
                  Dashboard <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="submenu">
                  {user && user.role === "Admin" ? (
                    <>
                      <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/admin/profile">My Profile</Link>
                      </li>
                      <li>
                        <Link to="/admin/courses">Courses</Link>
                      </li>
                      <li>
                        <Link to="/admin/users">User List</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings">Settings</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/student/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/student/profile">My Profile</Link>
                      </li>
                      <li>
                        <Link to="/student/courses">Courses</Link>
                      </li>
                      <li>
                        <Link to="/student/settings">Settings</Link>
                      </li>
                    </>
                  )}
                </ul>
              </li> */}
                  {/* <li className="has-submenu">
                <a href="#">
                  Pages <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="submenu">
                  <li className="active">
                    <Link to="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact us</Link>
                  </li>
                  <li className="has-submenu">
                    <a href="#">Authentication</a>
                    <ul className="submenu">
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                      <li>
                        <Link to="/forgot-password">Forgot Password</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </li> */}
                  <li className="">
                    <NavLink
                      to="/about-us"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      About us
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/contact-us"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Contact us
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/faq"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      FAQ
                    </NavLink>
                  </li>
                </ul>
              </>
            )}

            <div className="menu-dropdown">
              <div className="dropdown flag-dropdown mb-2">
                <a
                  href="#"
                  className="dropdown-toggle d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/img/flags/us-flag.svg"
                    className="me-2"
                    alt="flag"
                  />
                  ENG
                </a>
                <ul className="dropdown-menu p-2 mt-2">
                  <li>
                    <a
                      className="dropdown-item rounded d-flex align-items-center"
                      href="#"
                    >
                      <img
                        src="/assets/img/flags/us-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                      ENG
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item rounded d-flex align-items-center"
                      href="#"
                    >
                      <img
                        src="/assets/img/flags/vn-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                      VN
                    </a>
                  </li>
                </ul>
              </div>

              <div className="dropdown mb-2">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Light
                </a>
                <ul className="dropdown-menu p-2 mt-2">
                  <li>
                    <a className="dropdown-item rounded" href="#">
                      Light
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item rounded" href="#">
                      Dark
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* maybe remove the menu */}
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
            {user?.role === "Student" ? (
              <div className="main-menu-wrapper">
              <ul className="main-nav">
                <li className="has-submenu">
                  <a href="#">
                    Hello, {user?.name} <i className="fas fa-chevron-down"></i>
                  </a>
                  <ul className="submenu">
                    <li>
                      <NavLink
                        to="student/dashboard"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="student/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Your Profile
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink
                        to="student/courses"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Your Tests
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink
                        to="student/settings"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Settings
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            ) :(<></>)}
            {/* <div className="main-menu-wrapper">
              <ul className="main-nav">
                <li className="has-submenu">
                  <a href="#">
                    Hello, {user?.name} <i className="fas fa-chevron-down"></i>
                  </a>
                  <ul className="submenu">
                    <li>
                      <NavLink
                        to="student/dashboard"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="student/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Your Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="student/courses"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Your Tests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="student/settings"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Settings
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div> */}

            {user === null ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-light d-inline-flex align-items-center me-2"
                >
                  <i className="isax isax-lock-circle me-2"></i>Sign In
                </Link>
                <Link to="/register" className="btn btn-secondary me-0">
                  <i className="isax isax-user-edit me-2"></i>Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="btn btn-secondary me-0"
                >
                  <i className="isax isax-user-edit me-2"></i>Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
