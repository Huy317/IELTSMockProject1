import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";

interface UserBasicDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}

interface InforCardProps {
  userId: string | number;
}

function InforCard({ userId }: InforCardProps) {
  const [userInfo, setUserInfo] = useState<UserBasicDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        console.log("Fetching user data for userId:", userId);
        setLoading(true);
        setError(null);
        const userData = await getUserById(userId);
        console.log("User data received:", userData);
        setUserInfo(userData);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user information");
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserData();
    } else {
      console.log("No userId provided");
      setLoading(false);
      setError("No user ID provided");
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="alert alert-warning" role="alert">
            No user information found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="fs-18 pb-3 border-bottom mb-3">Basic Information</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Full Name</h6>
              <span>{userInfo.fullName}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Email</h6>
              <span>{userInfo.email}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Phone Number</h6>
              <span>{userInfo.phoneNumber || "Not provided"}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Role</h6>
              <span>{userInfo.role}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Created at</h6>
              <span>{new Date(userInfo.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforCard;
