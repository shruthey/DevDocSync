import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/auth";

const Dashboard = () => {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        department: user.department || "",
        position: user.position || "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await updateProfile(profileData);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>DevDocSync Dashboard</h1>
          <div className="user-actions">
            <span className="welcome-text">
              Welcome, {user?.first_name || user?.email}!
            </span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* User Profile Card */}
          <div className="card profile-card">
            <div className="card-header">
              <h3>Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="edit-button"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={profileData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={profileData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={profileData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      name="position"
                      value={profileData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <strong>Email:</strong> {user?.email}
                </div>
                <div className="info-item">
                  <strong>Name:</strong> {user?.first_name} {user?.last_name}
                </div>
                <div className="info-item">
                  <strong>Department:</strong>{" "}
                  {user?.department || "Not specified"}
                </div>
                <div className="info-item">
                  <strong>Position:</strong> {user?.position || "Not specified"}
                </div>
                <div className="info-item">
                  <strong>Role:</strong> {user?.role}
                </div>
                <div className="info-item">
                  <strong>Member since:</strong>{" "}
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Unknown"}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="card actions-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="actions-list">
              <button className="action-button" disabled>
                📝 Create New Document
              </button>
              <button className="action-button" disabled>
                📁 Browse Documents
              </button>
              <button className="action-button" disabled>
                👥 Manage Team
              </button>
              <button className="action-button" disabled>
                ⚙️ Settings
              </button>
            </div>
            <p className="coming-soon">Features coming soon!</p>
          </div>

          {/* Recent Activity Card */}
          <div className="card activity-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">🎉</span>
                <div className="activity-details">
                  <p>Welcome to DevDocSync!</p>
                  <small>Account created successfully</small>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="card stats-card">
            <div className="card-header">
              <h3>Your Stats</h3>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Documents</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Collaborations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
