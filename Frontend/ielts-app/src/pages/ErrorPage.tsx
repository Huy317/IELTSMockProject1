import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <h1 className="fw-bold mb-3">404</h1>
            <h2 className="mb-3">Page Not Found</h2>
            <p className="fs-3 text-secondary">The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary btn-lg mt-3">
                Go to Home
            </Link>
        </div>
    )
}

export default ErrorPage;