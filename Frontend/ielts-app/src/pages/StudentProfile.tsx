import InforCard from "../components/admin/InforCard";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function StudentProfile() {
  // Use the userId from URL params, or fallback to a default
  // const studentUserId = userId || "12"; // Replace with actual logic

  //PROBLEM IN HERE: Admin/Student login, they see their OWN profile, work correctly.
  //But if Admin tries to view a Student profile via URL with student userId, it still shows Admin's profile.
  //Need to fix this to show the correct profile based on the userId in the URL when Admin is viewing a Student's profile.
  const { user, isAuthenticated } = useAuth();
  const { userId } = useParams();
  const studentUserId = userId || "12";

  const isOwn = !userId;
  const isAdminView = !!userId;

  return (
    <div className="col-lg-9">
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">My Profile</h5>
        <NavLink to="/student/settings" className="edit-profile-icon">
          <i className="isax isax-edit-2"></i>
        </NavLink>
      </div>
      {/* <InforCard userId={studentUserId} /> */}

      {isAuthenticated && user && isAdminView ? (
        <InforCard userId={studentUserId} />
      ) : isOwn && user ? (
        <InforCard userId={user.id} />
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}
export default StudentProfile;
