import React from "react";

function StudentDashboard() {
  return (
    <div>
      {/* Profile Card */}
      <div className="profile-card overflow-hidden bg-blue-gradient2 mb-5 p-5">
        <div className="profile-card-bg">
          <img
            src="/assets/img/bg/card-bg-01.png"
            className="profile-card-bg-1"
            alt=""
          />
        </div>
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-6">
            <div className="d-flex align-items-center">
              <span className="avatar avatar-xxl avatar-rounded me-3 border border-white border-2 position-relative">
                <img src="/assets/img/user/user-02.jpg" alt="" />
                <span className="verify-tick">
                  <i className="isax isax-verify5"></i>
                </span>
              </span>
              <div>
                <h5 className="mb-1 text-white d-inline-flex align-items-center">
                  <a href="#">Ronald Richard</a>
                  <a href="#" className="link-light fs-16 ms-2">
                    <i className="isax isax-edit-2"></i>
                  </a>
                </h5>
                <p className="text-light">Student</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-lg-end flex-wrap gap-2">
              <a href="#" className="btn btn-white rounded-pill me-3">
                Become an Instructor
              </a>
              <a href="#" className="btn btn-secondary rounded-pill">
                Instructor Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="card bg-light quiz-ans-card mb-4">
        <img
          src="/assets/img/shapes/withdraw-bg1.svg"
          className="quiz-ans-bg1"
          alt="img"
        />
        <img
          src="/assets/img/shapes/withdraw-bg2.svg"
          className="quiz-ans-bg2"
          alt="img"
        />
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div>
                <h6 className="mb-1">Quiz : Build Responsive Real World </h6>
                <p>Answered : 15/22</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-end">
                <a href="#" className="btn btn-primary rounded-pill">
                  Continue Quiz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="row">
        <div className="col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-primary-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/graduation.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Enrolled Courses</span>
                  <h4 className="fs-24 mt-1">12</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-secondary-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/book.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Active Courses</span>
                  <h4 className="fs-24 mt-1">03</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-success-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/bookmark.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Completed Courses</span>
                  <h4 className="fs-24 mt-1">10</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Enrolled Courses */}
      <h5 className="mb-3 fs-18">Recently Enrolled Courses</h5>
      <div className="row">
        {/* Example course card */}
        <div className="col-xl-4 col-md-6">
          <div className="course-item-two course-item mx-0">
            <div className="course-img">
              <a href="#">
                <img
                  src="/assets/img/course/course-01.jpg"
                  alt="img"
                  className="img-fluid"
                />
              </a>
              <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                <div className="badge text-bg-danger">15% off</div>
                <a href="#" className="fav-icon ms-auto">
                  <i className="isax isax-heart"></i>
                </a>
              </div>
            </div>
            <div className="course-content">
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <a href="#" className="avatar avatar-sm">
                    <img
                      src="/assets/img/user/user-29.jpg"
                      alt="img"
                      className="img-fluid avatar avatar-sm rounded-circle"
                    />
                  </a>
                  <div className="ms-2">
                    <a href="#" className="link-default fs-14">
                      Brenda Slaton
                    </a>
                  </div>
                </div>
                <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                  Design
                </span>
              </div>
              <h6 className="title mb-2">
                <a href="#">Information About UI/UX Design Degree</a>
              </h6>
              <p className="d-flex align-items-center mb-3">
                <i className="fa-solid fa-star text-warning me-2"></i>4.9 (200
                Reviews)
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="text-secondary mb-0">$120</h5>
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
        {/* Add more course cards as needed */}
      </div>

      {/* Recent Invoices */}
      <div className="row">
        <div className="col-xl-7">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3 border-bottom pb-3 fs-18">Recent Invoices</h5>
              <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3">
                <div>
                  <h6 className="mb-1">
                    Build Responsive Real World Websites..
                  </h6>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-sm bg-light border d-inline-flex me-3">
                      #INV001
                    </span>
                    <p className="small">
                      Amount :{" "}
                      <span className="heading-color fw-semibold">$200</span>
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge fw-normal bg-success d-inline-flex align-items-center me-1">
                    <i className="fa-solid fa-circle fs-5 me-1"></i>Paid
                  </span>
                  <a href="#" className="action-icon">
                    <i className="isax isax-document-download"></i>
                  </a>
                </div>
              </div>
              {/* Add more invoice rows as needed */}
            </div>
          </div>
        </div>

        <div className="col-xl-5">
          <div className="card mb-0">
            <div className="card-body">
              <h5 className="mb-3 fs-18 border-bottom pb-3">Latest Quizes</h5>
              <div className="d-flex align-items-center flex-wrap flex-md-nowrap justify-content-between row-gap-2 mb-3">
                <div>
                  <h6 className="mb-1">Sketch from A to Z (2024)</h6>
                  <div className="d-flex align-items-center">
                    <p>Correct Answer : 15/22</p>
                  </div>
                </div>
                <div className="circle-progress flex-shrink-0" data-value="95">
                  <span className="progress-left">
                    <span className="progress-bar border-success"></span>
                  </span>
                  <span className="progress-right">
                    <span className="progress-bar border-success"></span>
                  </span>
                  <div className="progress-value">95%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
