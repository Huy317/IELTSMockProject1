import React from "react";
import InforCard from "../components/admin/InforCard";

function StudentProfile() {
  return (
    <div className="col-lg-9">
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">My Profile</h5>
        <a href="#" className="edit-profile-icon"><i className="isax isax-edit-2"></i></a>
      </div>
      <InforCard/>
    </div>
  );
}
export default StudentProfile;
