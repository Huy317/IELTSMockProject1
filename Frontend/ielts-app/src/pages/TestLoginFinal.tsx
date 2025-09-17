import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login as loginService, storeToken, getCurrentUser } from '../services/authService';

function LoginPageFinal() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginService(credentials);
      storeToken(response.token);

      const userInfo = getCurrentUser();
      if (userInfo) {
        login(userInfo, response.token);
        const destination = from || `/${userInfo.role.toLowerCase()}/dashboard`;
        navigate(destination, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
      loginFailed("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  let [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function loginFailed(e: string) {
    setAlertMessage(e);
  }

  return (
    <div className="login-content">
      <div className="row">
        {/* <!-- Login Banner --> */}
        <div className="col-md-6 login-bg d-none d-lg-flex">
          <div className="login-carousel">
            <div>
              <div className="login-carousel-section mb-3">
                <div className="login-banner">
                  <img
                    src="../assets/img/auth/auth-1.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </div>
                <div className="mentor-course text-center">
                  <h3 className="mb-2">
                    Welcome to <br />
                    IELTS<span className="text-secondary">Mock</span> Platform.
                  </h3>
                  <p>
                    Comprehensive IELTS preparation platform designed to help
                    test-takers achieve their target band scores through
                    realistic mock tests and expert guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Login Banner --> */}

        <div className="col-md-6 login-wrap-bg">
          {/* <!-- Login --> */}
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between login-header">
                  
                  {/* <a href="index.html" className="link-1">Back to Home</a> */}
                  <Link to="/" className="link-1">
                    <img
                    src="../assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                  </Link>
                </div>
                <div
                  className={
                    "alert alert-danger " +
                    (alertMessage != "" ? "d-block" : "d-none")
                  }
                >
                  {alertMessage}
                </div>
                <h1 className="fs-32 fw-bold topic">Sign into Your Account</h1>
                <form className="mb-3 pb-3" onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <label className="form-label">
                      Email<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="email"
                        value={credentials.email}
                        className="form-control form-control-lg"
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        required
                      />
                      <span>
                        <i className="isax isax-sms input-icon text-gray-7 fs-14"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 position-relative">
                    <label className="form-label">
                      Password <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="position-relative" id="passwordInput">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        className="pass-inputs form-control form-control-lg"
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        required
                      />
                      <span
                        className={`isax toggle-passwords fs-14 ${
                          showPassword ? "isax-eye" : "isax-eye-slash"
                        }`}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      ></span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="remember-me d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="flexCheckDefault"
                      >
                        Remember Me
                      </label>
                    </div>
                    <div className="">
                      <Link to="/forgot-password" className="link-2">
                        Forgot Password ?
                      </Link>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-secondary btn-lg" type="submit">
                      Login <i className="isax isax-arrow-right-3 ms-1"></i>
                    </button>
                  </div>
                </form>

                <div className="d-flex align-items-center justify-content-center or fs-14 mb-3">
                  Or
                </div>

                <div className="d-flex align-items-center justify-content-center mb-3">
                  <a href="javascript:void(0);" className="btn btn-light me-2">
                    <img
                      src="../assets/img/icons/google.svg"
                      alt="img"
                      className="me-2"
                    />
                    Google
                  </a>
                  <a href="javascript:void(0);" className="btn btn-light">
                    <img
                      src="../assets/img/icons/facebook.svg"
                      alt="img"
                      className="me-2"
                    />
                    Facebook
                  </a>
                </div>

                <div className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                  Don't you have an account?
                  <Link to="/register" className="link-2 ms-1">
                    Sign up
                  </Link>
                </div>

                {/* <!-- /Login --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageFinal;
