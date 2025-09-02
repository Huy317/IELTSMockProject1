import React from "react";
import TestCard from "../components/student/TestCard";

function StudentDashboard() {
  return (
    <div>
      {/* Profile Card */}
      {/* <div className="profile-card overflow-hidden bg-blue-gradient2 mb-5 p-5">
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
      </div> */}

      {/* Quiz Card */}
      {/* <div className="card bg-light quiz-ans-card mb-4">
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
      </div> */}

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
                  <span className="d-block">Taken Tests</span>
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
                  <span className="d-block">Active Tests</span>
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
                  <span className="d-block">Completed Tests</span>
                  <h4 className="fs-24 mt-1">10</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Enrolled Courses */}
      <h5 className="mb-3 fs-18">Recently Taken Tests</h5>
      <div className="row">
        <TestCard/>
      </div>
    </div>
  );
}

export default StudentDashboard;
