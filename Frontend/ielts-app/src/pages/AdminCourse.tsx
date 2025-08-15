import React from "react";

function AdminCourse() {
  return (
    <div>
      {/* Course Stats Cards */}
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6">
          <div className="card bg-success">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Active Courses</h6>
              <h4 className="fw-bold text-white">45</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card bg-secondary">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Pending Courses</h6>
              <h4 className="fw-bold text-white">21</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card bg-info">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Draft Courses</h6>
              <h4 className="fw-bold text-white">15</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card bg-skyblue">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Free Courses</h6>
              <h4 className="fw-bold text-white">16</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card bg-purple">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Paid Courses</h6>
              <h4 className="fw-bold text-white">21</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title and Icons */}
      <div className="page-title d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold">Courses</h5>
        <div className="d-flex align-items-center list-icons">
          <a href="#" className="active me-2"><i className="isax isax-task"></i></a>
          <a href="#"><i className="isax isax-element-3"></i></a>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="row mb-3">
        <div className="col-md-8">
          <div className="mb-3">
            <div className="dropdown">
              <a href="#" className="dropdown-toggle text-gray-6 btn rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                Status
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li><a href="#" className="dropdown-item rounded-1">Published</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Pending</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Draft</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-icon mb-3">
            <span className="input-icon-addon">
              <i className="isax isax-search-normal-14"></i>
            </span>
            <input type="text" className="form-control form-control-md" placeholder="Search" />
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="table-responsive custom-table">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Course Name</th>
              <th>Students</th>
              <th>Price</th>
              <th>Ratings</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <a href="#" className="avatar avatar-lg me-2 flex-shrink-0">
                    <img className="img-fluid object-fit-cover" src="/assets/img/course/course-01.jpg" alt="" />
                  </a>
                  <div>
                    <h6 className="fw-medium mb-2"><a href="#">Information About UI/UX Design Degree</a></h6>
                    <div className="d-flex align-items-center">
                      <span className="d-inline-flex fs-12 align-items-center me-2 pe-2 border-end"><i className="isax isax-video-circle me-1 text-gray-9 fw-bold"></i>11 Lessons</span>
                      <span className="d-inline-flex fs-12 align-items-center me-2 pe-2 border-end"><i className="isax isax-message-question me-1 text-gray-9 fw-bold"></i>2 Quizzes</span>
                      <span className="d-inline-flex fs-12 align-items-center"><i className="isax isax-clock me-1 text-gray-9 fw-bold"></i>03:15:00 Hours</span>
                    </div>
                  </div>
                </div>
              </td>
              <td>600</td>
              <td>$160</td>
              <td>
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-star fs-12 filled text-warning me-1"></i>
                  <span>4.5 (300)</span>
                </div>
              </td>
              <td><span className="badge badge-sm bg-success d-inline-flex align-items-center me-1"><i className="fa-solid fa-circle fs-5 me-1"></i>Published</span></td>
              <td>
                <div className="d-flex align-items-center">
                  <a href="#" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-edit-2"></i></a>
                  <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-trash"></i></a>
                </div>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourse;