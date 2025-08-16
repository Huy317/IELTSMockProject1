import React from "react";

export interface SingleEnrolledCourseCardProps {
  image: string;
  adminAvatar: string;
  adminName: string;
  skillType: string;
  title: string;
  rating: number;
  reviewCount: number;
}

const enrolledCourseCards: SingleEnrolledCourseCardProps[] = [
  {
    image: "/assets/img/course/course-01.jpg",
    adminAvatar: "/assets/img/user/user-29.jpg",
    adminName: "Thanh Duy",
    skillType: "Listening",
    title: "IELTS LISTENING TEST 3",
    rating: 4.9,
    reviewCount: 200,
  },
  {
    image: "/assets/img/course/course-01.jpg",
    adminAvatar: "/assets/img/user/user-29.jpg",
    adminName: "Thanh Duy",
    skillType: "Reading",
    title: "IELTS READING TEST 3",
    rating: 4.9,
    reviewCount: 200,
  },
];

function TestCard() {
  return (
    <>
      {enrolledCourseCards.map((card, idx) => (
        <div className="col-xl-4 col-md-6" key={idx}>
          <div className="course-item-two course-item mx-0">
            <div className="course-img">
              <a href="#">
                <img src={card.image} alt="img" className="img-fluid" />
              </a>
            </div>
            <div className="course-content">
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <a href="#" className="avatar avatar-sm">
                    <img
                      src={card.adminAvatar}
                      alt="img"
                      className="img-fluid avatar avatar-sm rounded-circle"
                    />
                  </a>
                  <div className="ms-2">
                    <a href="#" className="link-default fs-14">
                      {card.adminName}
                    </a>
                  </div>
                </div>
                <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                  {card.skillType}
                </span>
              </div>
              <h6 className="title mb-2">
                <a href="#">{card.title}</a>
              </h6>
              <p className="d-flex align-items-center mb-3">
                <i className="fa-solid fa-star text-warning me-2"></i>
                {card.rating} ({card.reviewCount} Attempts)
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <a
                  href="#"
                  className="btn btn-dark btn-sm d-inline-flex align-items-center"
                >
                  View Course<i className="isax isax-arrow-right-3 ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TestCard;
