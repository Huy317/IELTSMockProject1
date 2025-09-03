import InforCard from "../components/admin/InforCard";
import { useParams } from "react-router-dom";

function AdminProfile() {
  const { userId } = useParams();
  
  // For now, using a hardcoded ID. You should replace this with actual current user ID from auth context
  const currentUserId = userId || "12"; // Replace with actual current user ID
  
  return (
    <div>
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">My Profile</h5>
        <a href="#" className="edit-profile-icon">
          <i className="isax isax-edit-2"></i>
        </a>
      </div>
      <InforCard userId={currentUserId} />
      {/* <div className="card">
        <div className="card-body">
          <h5 className="fs-18 pb-3 border-bottom mb-3">Education</h5>
          <div className="education-flow">
            <div className="ps-4 pb-3 timeline-flow">
              <div>
                <h6 className="mb-1">BCA - Bachelor of Computer Applications</h6>
                <p>International University - (2004 - 2010)</p>
              </div>
            </div>
            <div className="ps-4 pb-3 timeline-flow">
              <div>
                <h6 className="mb-1">MCA - Master of Computer Application</h6>
                <p>International University - (2010 - 2012)</p>
              </div>
            </div>
            <div className="ps-4 pb-0 timeline-flow">
              <div>
                <h6 className="mb-1">Design Communication Visual</h6>
                <p>International University - (2012-2015)</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="card mb-0">
        <div className="card-body">
          <h5 className="fs-18 pb-3 border-bottom mb-3">Experience</h5>
          <div className="d-flex align-items-center mb-4">
            <span className="bg-light border avatar avatar-lg text-gray-9 flex-shrink-0 me-3"><i className="isax isax-briefcase fw-bold"></i></span>
            <div>
              <h6 className="mb-1">Web Design & Development Team Leader</h6>
              <p>Creative Agency - (2013 - 2016)</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span className="bg-light border avatar avatar-lg text-gray-9 flex-shrink-0 me-3"><i className="isax isax-briefcase fw-bold"></i></span>
            <div>
              <h6 className="mb-1">Project Manager</h6>
              <p>CJobcy Technology Pvt.Ltd - (Present)</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AdminProfile;
