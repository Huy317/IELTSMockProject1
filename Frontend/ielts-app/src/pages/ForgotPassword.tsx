import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface ForgotPasswordFormData {
    email: string;
}





function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgotPasswordFormData>();

    const navigate = useNavigate();
    // Placeholder functions for API calls
    const requestSuccess = (message: string) => {
        console.log('Success:', message);
        navigate('/reset-password');
        // TODO: switch to reset password page
    };

    function requestFailed(error: string) {
        console.error('Error:', error);
        // TODO: Replace with actual error handling (toast notification, etc.)
    };
    function onSubmit(data: ForgotPasswordFormData) {
        try {

            console.log('Submitting forgot password request for:', data.email);

            // TODO: Replace with actual API call

            requestSuccess('Password reset link has been sent to your email');
        } catch (error) {
            requestFailed('Failed to send password reset email. Please try again.');
        }
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
                                        <img src="../assets/img/auth/auth-1.svg" className="img-fluid" alt="Logo" />
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h3 className="mb-2">
                                            Welcome to <br />
                                            Dreams<span className="text-secondary">LMS</span> Courses.
                                        </h3>
                                        <p>Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Login Banner */}

                    <div className="col-md-6 login-wrap-bg">
                        {/* Login */}
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="w-100">
                                    <div className="d-flex align-items-center justify-content-between login-header">
                                        <img src="../assets/img/logo.svg" className="img-fluid" alt="Logo" />
                                        {/* <a href="index.html" className="link-1">Back to Home</a> */}
                                        <Link to="/" className="link-1">Back to Home</Link>
                                    </div>
                                    <div className="topic">
                                        <h1 className="fs-32 fw-bold mb-3">Forgot Password</h1>
                                        <p className="fs-14 fw-normal mb-0">Enter your email to reset your password.</p>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="mb-3 pb-3">
                                        <div className="mb-3 position-relative">
                                            <label className="form-label">Email<span className="text-danger ms-1">*</span></label>
                                            <div className="position-relative">
                                                <input
                                                    type="email"
                                                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                                    {...register('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: 'Invalid email address'
                                                        }
                                                    })}
                                                />
                                                <span><i className="isax isax-sms input-icon text-gray-7 fs-14"></i></span>
                                            </div>
                                            {errors.email && (
                                                <div className="invalid-feedback d-block">
                                                    {errors.email.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-secondary btn-lg"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                                <i className="isax isax-arrow-right-3 ms-1"></i>
                                            </button>
                                        </div>
                                    </form>

                                    <p className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                                        Remember Password?<Link to="/login" className="link-2 ms-1"> Sign In</Link>
                                    </p>

                                    {/* /Login */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;