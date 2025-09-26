import InforCard from "../components/admin/InforCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function AdminProfile() {
  // const { userId } = useParams();
  // // For now, using a hardcoded ID. You should replace this with actual current user ID from auth context
  // const currentUserId = userId || "12"; // Replace with actual current user ID

  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <div className="page-title d-flex align-items-center justify-content-between">
        <h5 className="fw-bold">My Profile</h5>
        <NavLink to="/admin/settings" className="edit-profile-icon">
          <i className="isax isax-edit-2"></i>
        </NavLink>
      </div>
      {/* <InforCard userId={currentUserId} /> */}
      {isAuthenticated && user ? (
        <InforCard userId={user.id} />
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default AdminProfile;
