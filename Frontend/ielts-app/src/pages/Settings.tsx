import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../services/userService";
import type { User } from "../types/User";

function AdminSetting() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Separate states for profile and password
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    loadUserData();
  }, [userId]);

  async function loadUserData() {
    try {
      setLoading(true);
      if (userId) {
        const userData = await getUserById(userId);
        setUser(userData);
        setProfileData({
          fullName: userData.fullName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
        });
        setPasswordData({
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  }

  function handleProfileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handlePasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user) {
      toast.error("No user data available");
      return;
    }

    try {
      const updateData = {
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
      };

      await updateUser(user.id, updateData);
      toast.success("Profile updated successfully!");
      
      await loadUserData();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user) {
      toast.error("No user data available");
      return;
    }

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const updateData = {
        fullName: profileData.fullName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        password: passwordData.newPassword,
      };

      await updateUser(user.id, updateData);
      toast.success("Password updated successfully!");
      
      setPasswordData({
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password");
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3">
        <h5>Settings</h5>
      </div>
      <form onSubmit={handleProfileSubmit}>
        <div className="card mt-3">
          <div className="card-body">
            <div className="profile-upload-group">
              <div className="d-flex align-items-center">
                <a href="#" className="avatar flex-shrink-0 avatar-xxxl avatar-rounded border me-3">
                  <img src="/assets/img/user/user-01.jpg" alt="Img" className="img-fluid" />
                </a>
                <div className="profile-upload-head">
                  <h6><a href="#">Your Avatar</a></h6>
                  <p className="fs-14 mb-0">PNG or JPG no bigger than 800px width and height</p>
                  <div className="new-employee-field">
                    <div className="d-flex align-items-center mt-2">
                      <div className="image-upload position-relative mb-0 me-2">
                        <input type="file" />
                        <a href="#" className="btn bg-gray-100 btn-sm rounded-pill image-uploads">Upload</a>
                      </div>
                      <div className="img-delete">
                        <a href="#" className="btn btn-secondary btn-sm rounded-pill">Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="edit-profile-info mb-3">
                <h5 className="mb-1 fs-18">Personal Details</h5>
                <p>Edit your personal information</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Full Name <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email <span className="text-danger">*</span></label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleProfileInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={user?.role || ""} 
                      readOnly 
                    />
                  </div>
                </div>
                
                <div className="col-md-12">
                  <button className="btn btn-secondary rounded-pill" type="submit">Update Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      <form onSubmit={handlePasswordSubmit}>
        <div className="card mb-0 mt-3">
          <div className="card-body">
            <h5 className="fs-18 mb-3">Update Password</h5>
            <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">New Password <span className="text-danger">*</span></label>
                    <input 
                      type="password" 
                      className="form-control" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Enter new password" 
                      minLength={8}
                      title="Password must be at least 8 characters long"
                      required
                    />
                    <div className="form-text">Password must be at least 8 characters long</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password <span className="text-danger">*</span></label>
                    <input 
                      type="password" 
                      className="form-control" 
                      name="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      onChange={handlePasswordInputChange}
                      placeholder="Confirm new password" 
                      required
                    />
                  </div>
                </div>
            <button className="btn btn-secondary" type="submit">Update Password</button>
          </div>
        </div>
      </form>
      
      <div className="card mb-0 mt-3">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Delete Account</h5>
          <h6 className="mb-1">Are you sure you want to delete your account?</h6>
          <p className="mb-3">Refers to the action of permanently removing a user's account and associated data from a system, service and platform.</p>
          <a href="#" className="btn btn-secondary">Delete Account</a>
        </div>
      </div>
    </div>
  );
}

export default AdminSetting;