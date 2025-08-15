import React from "react";

function StudentProfile() {
  return (
    <div className="col-lg-9">
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">My Profile</h5>
        <a href="#" className="edit-profile-icon"><i className="isax isax-edit-2"></i></a>
      </div>
      <div className="card mb-0">
        <div className="card-body">
          <h6 className="fs-18 page-title fw-bold">Basic Information</h6>
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <h6>First Name</h6>
                <span>Ronald</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>Last Name</h6>
                <span>Richard</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>Registration Date</h6>
                <span>16 Jan 2024, 11:15 AM</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>User Name</h6>
                <span>studentdemo</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>Phone Number</h6>
                <span>90154-91036</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>Email</h6>
                <span><a href="#">[email&#160;protected]</a></span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>Gender</h6>
                <span>Male</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>DOB</h6>
                <span>16 Jan 2020</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h6>Age</h6>
                <span>24</span>
              </div>
            </div>
            <div className="col-md-12">
              <div>
                <h6>Bio</h6>
                <span>Hello! I'm Ronald Richard. I'm passionate about developing innovative software solutions, analyzing classic literature. I aspire to become a software developer, work as an editor. In my free time, I enjoy coding, reading, hiking etc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentProfile;
