import InforCard from "../components/admin/InforCard";
import { useParams } from "react-router-dom";

function StudentProfile() {
  const { userId } = useParams();
  
  // Use the userId from URL params, or fallback to a default
  const studentUserId = userId || "12"; // Replace with actual logic
  
  return (
    <div className="col-lg-9">
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">My Profile</h5>
        <a href="#" className="edit-profile-icon"><i className="isax isax-edit-2"></i></a>
      </div>
      <InforCard userId={studentUserId} />
    </div>
  );
}
export default StudentProfile;
