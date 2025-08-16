import React from "react";
import TestCard from "../components/student/TestCard";

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
            <TestCard/>
            {/* ...add more course cards as needed... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourses;
