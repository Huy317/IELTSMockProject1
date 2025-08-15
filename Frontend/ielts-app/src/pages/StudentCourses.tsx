import React from "react";

function StudentCourses() {
  return (
    <div className="col-lg-9">
      <div className="page-title d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <h5>Enrolled Courses</h5>
        <div className="tab-list">
          <ul className="nav mb-0 gap-2" role="tablist">
            <li className="nav-item mb-0" role="presentation">
              <a href="#" className="active" data-bs-toggle="tab" data-bs-target="#enroll-courses" aria-selected="true" role="tab">Enrolled (09)</a>
            </li>
            <li className="nav-item mb-0" role="presentation">
              <a href="#" data-bs-toggle="tab" data-bs-target="#active-courses" aria-selected="false" role="tab" tabIndex={-1}>Active (06)</a>
            </li>
            <li className="nav-item mb-0" role="presentation">
              <a href="#" data-bs-toggle="tab" data-bs-target="#complete-courses" aria-selected="false" role="tab" tabIndex={-1}>Completed (03)</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane fade active show" id="enroll-courses" role="tabpanel">
          <div className="row">
            {/* Example course card */}
            <div className="col-xl-4 col-md-6">
              <div className="course-item-two course-item mx-0">
                <div className="course-img">
                  <a href="#">
                    <img src="/assets/img/course/course-01.jpg" alt="img" className="img-fluid" />
                  </a>
                  <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                    <div className="badge text-bg-danger">15% off</div>
                    <a href="#" className="fav-icon ms-auto"><i className="isax isax-heart"></i></a>
                  </div>
                </div>
                <div className="course-content">
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <a href="#" className="avatar avatar-sm">
                        <img src="/assets/img/user/user-29.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                      </a>
                      <div className="ms-2">
                        <a href="#" className="link-default fs-14">Brenda Slaton</a>
                      </div>
                    </div>
                    <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">Design</span>
                  </div>
                  <h6 className="title mb-2"><a href="#">Information About UI/UX Design Degree</a></h6>
                  <p className="d-flex align-items-center mb-3"><i className="fa-solid fa-star text-warning me-2"></i>4.9 (200 Reviews)</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="text-secondary mb-0">$120</h5>
                    <a href="#" className="btn btn-dark btn-sm d-inline-flex align-items-center">View Course<i className="isax isax-arrow-right-3 ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            {/* ...add more course cards as needed... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourses;
