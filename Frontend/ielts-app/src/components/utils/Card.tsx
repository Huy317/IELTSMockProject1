import { Link } from "react-router-dom";

interface CardProps {
    id?: number | string;
    title?: string;
    image?: string;
    attemptCount?: number | string;
    questionCount?: number | string;
    type?: string;
    timeMinutes?: string | number;
}

function Card({ title = "No Title",
    id,
    image,
    questionCount = 0,
    attemptCount = "Unknown",
    type = "",
    timeMinutes = "0",
}: CardProps) {

    return (
        <div className="course-item-two course-item mb-0 mx-1">
            {/* Not display <img> when no img props */}
            {image && (
                <div className="course-img">
                    <img src={image} alt="img" className="img-fluid" />
                </div>
            )}
            <div className="course-content">
                <h6 className="mb-2">
                    {/* TODO: Change this link to new test routing */}
                    <Link to="/course-details">{title}</Link>
                </h6>
                <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                        <a href="javascript:void(0);" className="avatar avatar-sm">
                            <img src="/assets/img/participantCount.png" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                        </a>
                        <div className="ms-2">
                            <a href="javascript:void(0);" className="link-default fs-14 bold">{attemptCount} attempts</a>
                        </div>
                    </div>
                    <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium">
                        {type}
                    </span>
                </div>

                <p className="d-flex align-items-center mb-3">
                    <i className="ti ti-clock me-2"></i>{timeMinutes} min
                </p>
                <div className="d-flex align-items-center justify-content-between">
                    <h6 className="text-secondary fs-16 fw-semi-bold mb-0">{questionCount} Questions</h6>
                    <Link to={`/test/${id}`} className="btn btn-dark btn-sm d-inline-flex align-items-center">
                        Start This Test<i className="isax isax-arrow-right-3 ms-1"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;