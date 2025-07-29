import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/auth";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({ total_users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUserStats();
    // Only try to fetch all users if current user is admin
    if (currentUser?.is_superuser) {
      fetchAllUsers();
    }
  }, [currentUser]);

  const fetchUserStats = async () => {
    try {
      const response = await apiClient.get("/auth/stats/users");
      setUserStats(response.data);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      setError("Failed to load user statistics");
    }
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/auth/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Admin access required.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="user-management">
        <h2>User Management</h2>
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="management-header">
        <h2>User Management</h2>
        <div className="stats-summary">
          <div className="stat-card">
            <div className="stat-number">{userStats.total_users}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {currentUser?.is_superuser ? (
        <div className="users-table-container">
          <h3>All Users</h3>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>
                        {user.first_name || user.last_name
                          ? `${user.first_name || ""} ${
                              user.last_name || ""
                            }`.trim()
                          : "N/A"}
                      </td>
                      <td>{user.department || "N/A"}</td>
                      <td>{user.position || "N/A"}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.is_active ? "active" : "inactive"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="access-denied">
          <h3>Access Restricted</h3>
          <p>You need administrator privileges to view all users.</p>
          <p>You can only see basic statistics and your own profile.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
