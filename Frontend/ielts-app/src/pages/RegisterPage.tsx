import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';


const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordComment, setPasswordComment] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    let navigate = useNavigate();

    // Calculate password strength -> update the visual bars
    function calculatePasswordStrength(inputPass:string) {
        let poorRegExp = /^(?:[a-zA-Z]+|[0-9]+)$/; // Only letters OR only numbers
        let weakRegExp = /(?=.*[a-zA-Z])(?=.*[0-9])/; // Both letters AND numbers
        let strongRegExp = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/; // Letters, numbers AND special characters
  
	    let whitespaceRegExp = /^$|\s+/;

        let strength = 0;
        let comment = "";

        if (inputPass.length < 8) {
            strength = 1;
            comment = "Weak, must be at least 8 characters";
        } else if (poorRegExp.test(inputPass)) {
            strength = 2;
            comment = "Average, only letters or numbers";
        } else if (weakRegExp.test(inputPass)) {
            strength = 3;
            comment = "Good, must contain special symbol";
        }

        if (strongRegExp.test(inputPass)) {
            strength = 4;
            comment = "Strong, contains letters, numbers, and special characters";
        }

        if (inputPass.match(whitespaceRegExp)) {
            setPasswordStrength(0);
            setPasswordComment("Password cannot contain whitespace");
            return 0;
        }

        setPasswordStrength(strength);
        setPasswordComment(comment);
        return strength;
    };

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const inputPass = event.currentTarget.value;
        setPassword(inputPass);
        calculatePasswordStrength(inputPass);
    }

    function registerSuccess(){
        navigate('/login');
    }
    
    function registerFailed(e : string){
        setAlertMessage("Error occurs when submitting");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent page refresh

        // TODO: some kind of notification/text to display the submit status
        

        if (fullName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            console.log('All fields are required');
            return;
        }

        if (password !== confirmPassword){
            console.log('Passwords do not match');
            return;
        }

        if (calculatePasswordStrength(password) < 4) {
            console.log('Password is not strong enough');
            return;
        }

        // Register success
        // TODO: API Call here
        

        console.log('Registration data:', {
            fullName,
            email,
            password,
            confirmPassword,
            agreeToTerms
        });
    };

    return (
        <div className="main-wrapper">
            <div className="login-content">
                <div className="row">
                    {/* Login Banner */}
                    <div className="col-md-6 login-bg d-none d-lg-flex">
                        <div className="login-carousel">
                            <div>
                                <div className="login-carousel-section mb-3">
                                    <div className="login-banner">
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="IELTS Platform Logo" />
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
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="IELTS Platform Logo" />
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h3 className="mb-2">Master Your <br />IELTS<span className="text-secondary"> Journey</span>.</h3>
                                        <p>Access full-length practice tests, detailed performance analytics, and personalized feedback to boost your confidence and achieve your desired IELTS score.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="login-carousel-section mb-3">
                                    <div className="login-banner">
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="IELTS Platform Logo" />
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h3 className="mb-2">Join Thousands of <br />Successful<span className="text-secondary"> Test-Takers</span>.</h3>
                                        <p>Practice with authentic IELTS materials, track your progress across all four skills, and get ready for test day with our comprehensive preparation tools.</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* /Login Banner */}

                    <div className="col-md-6 login-wrap-bg">
                        {/* Registration Form */}
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="w-100">
                                    <div className="d-flex align-items-center justify-content-between login-header">
                                        <img src="../assets/img/logo.svg" className="img-fluid" alt="IELTS Mock Platform Logo" />
                                        <Link to="/" className="link-1">Back to Home</Link>
                                    </div>
                                    <div className={"alert alert-danger "+(alertMessage != "" ? "d-block" : "d-none")}>{alertMessage}</div>
                                    <h1 className="fs-32 fw-bold topic">Create Your IELTS Account</h1>
                                    <form onSubmit={handleSubmit} className="mb-3 pb-3">
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">Full Name<span className="text-danger ms-1">*</span></label>
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="fullName"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    required
                                                />
                                                <span><i className="isax isax-user input-icon text-gray-7 fs-14"></i></span>
                                            </div>
                                        </div>
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">Email<span className="text-danger ms-1">*</span></label>
                                            <div className="position-relative">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <span><i className="isax isax-sms input-icon text-gray-7 fs-14"></i></span>
                                            </div>
                                        </div>
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">New Password <span className="text-danger"> *</span></label>
                                            <div className="position-relative" id="passwordInput">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="pass-inputs form-control form-control-lg"
                                                    name="password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    required
                                                />
                                                <span
                                                    className={`isax toggle-passwords ${showPassword ? 'isax-eye' : 'isax-eye-slash'} text-gray-7 fs-14`}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{ cursor: 'pointer' }}
                                                ></span>
                                            </div>
                                            <div className="password-strength" id="passwordStrength">
                                                <span id="poor" className={passwordStrength > 0 ? `strength-${passwordStrength}` : ''}></span>
                                                <span id="weak" className={passwordStrength > 1 ? `strength-${passwordStrength}` : ''}></span>
                                                <span id="strong" className={passwordStrength > 2 ? `strength-${passwordStrength}` : ''}></span>
                                                <span id="heavy" className={passwordStrength > 3 ? `strength-${passwordStrength}` : ''}></span>
                                            </div>
                                            <div className={"mt-2 " + `strength-text-${passwordStrength}`}
                                                id="passwordInfo">
                                                {passwordComment}
                                            </div>
                                        </div>
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">Confirm Password <span className="text-danger"> *</span></label>
                                            <div className="position-relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="pass-inputa form-control form-control-lg"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                                <span
                                                    className={`isax toggle-passworda ${showConfirmPassword ? 'isax-eye' : 'isax-eye-slash'} text-gray-7 fs-14`}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{ cursor: 'pointer' }}
                                                ></span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="remember-me d-flex align-items-center">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    checked={agreeToTerms}
                                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                                    id="flexCheckDefault"
                                                    required
                                                />
                                                <label className="form-check-label mb-0 d-inline-flex remember-me fs-14" htmlFor="flexCheckDefault">
                                                    I agree with <Link to="/terms" className="link-2 mx-2">Terms of Service</Link> and <Link to="/privacy" className="link-2 mx-2">Privacy Policy</Link>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-secondary btn-lg" type="submit">
                                                Start IELTS Journey <i className="isax isax-arrow-right-3 ms-1"></i>
                                            </button>
                                        </div>
                                    </form>

                                    <div className="d-flex align-items-center justify-content-center or fs-14 mb-3">
                                        Or
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                        <button className="btn btn-light me-2">
                                            <img src="../assets/img/icons/google.svg" alt="Google" className="me-2" />Google
                                        </button>
                                        <button className="btn btn-light">
                                            <img src="../assets/img/icons/facebook.svg" alt="Facebook" className="me-2" />Facebook
                                        </button>
                                    </div>

                                    <div className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                                        Already have an account?<Link to="/login" className="link-2 ms-1"> Sign In</Link>
                                    </div>

                                    {/* /Registration Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
