import { Link } from "react-router-dom";

function LoginPage(){
    return (
        <div className="login-content">
                <div className="row">
                    {/* <!-- Login Banner --> */}
                    <div className="col-md-6 login-bg d-none d-lg-flex">
                        <div className="login-carousel">
                            <div>
                                <div className="login-carousel-section mb-3">
                                    <div className="login-banner">
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="Logo"/>
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h3 className="mb-2">Welcome to <br />IELTS<span className="text-secondary">Mock</span> Platform.</h3>
                                        <p>Comprehensive IELTS preparation platform designed to help test-takers achieve their target band scores through realistic mock tests and expert guidance.</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                                <div className="login-carousel-section mb-3">
                                    <div className="login-banner">
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="Logo"/>
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h3 className="mb-2">Welcome to <br/>Dreams<span className="text-secondary">LMS</span> Courses.</h3>
                                        <p>Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="login-carousel-section mb-3">
                                    <div className="login-banner">
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="Logo"/>
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h3 className="mb-2">Welcome to <br/>Dreams<span className="text-secondary">LMS</span> Courses.</h3>
                                        <p>Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <!-- /Login Banner --> */}
        
                    <div className="col-md-6 login-wrap-bg">
                        {/* <!-- Login --> */}
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="w-100">
                                    <div className="d-flex align-items-center justify-content-between login-header">
                                        <img src="../assets/img/logo.svg" className="img-fluid" alt="Logo"/>
                                        {/* <a href="index.html" className="link-1">Back to Home</a> */}
                                        <Link to="/" className="link-1">Back to Home</Link>
                                    </div>
                                    <h1 className="fs-32 fw-bold topic">Sign into Your Account</h1>
                                    <form action="https://dreamslms.dreamstechnologies.com/html/template/instructor-dashboard.html" className="mb-3 pb-3">
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">Email<span className="text-danger ms-1">*</span></label>
                                            <div className="position-relative">
                                                <input type="email" className="form-control form-control-lg"/>
                                                <span><i className="isax isax-sms input-icon text-gray-7 fs-14"></i></span>
                                            </div>
                                        </div>
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">Password <span className="text-danger ms-1">*</span></label>
                                            <div className="position-relative" id="passwordInput">
                                                <input type="password" className="pass-inputs form-control form-control-lg"/>
                                                <span className="isax toggle-passwords isax-eye-slash fs-14"></span>
                                            </div>	
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="remember-me d-flex align-items-center">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label className="form-check-label ms-2" htmlFor="flexCheckDefault">
                                                    Remember Me
                                                </label>
                                            </div>
                                            <div className="">
                                                <a href="forgot-password.html" className="link-2">
                                                    Forgot Password ?
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-secondary btn-lg" type="submit">Login <i className="isax isax-arrow-right-3 ms-1"></i></button>
                                        </div>
                                    </form>

                                    <div className="d-flex align-items-center justify-content-center or fs-14 mb-3">
                                        Or
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <a href="javascript:void(0);" className="btn btn-light me-2"><img src="../assets/img/icons/google.svg" alt="img" className="me-2"/>Google</a>
                                        <a href="javascript:void(0);" className="btn btn-light"><img src="../assets/img/icons/facebook.svg" alt="img" className="me-2"/>Facebook</a>
                                    </div>

                                    <div className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                                        Don't you have an account?<Link to="/register" className="link-2 ms-1">Sign up</Link>
                                    </div>
    
                                    {/* <!-- /Login --> */}
        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default LoginPage;