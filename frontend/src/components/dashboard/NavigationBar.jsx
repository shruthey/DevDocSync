import React from "react";

const NavigationBar = ({
  user,
  notifications,
  searchQuery,
  setSearchQuery,
  onLogout,
}) => {
  return (
    <nav className="dashboard-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-icon">📚</div>
          <h2>DevDocSync</h2>
        </div>

        <div className="nav-search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search documents, users, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="nav-actions">
          <div className="nav-item">
            <button className="notification-btn" title="Notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">{notifications.length}</span>
            </button>
          </div>

          <div className="nav-item">
            <button className="help-btn" title="Help">
              <span>❓</span>
            </button>
          </div>

          <div className="nav-item user-menu">
            <div className="user-avatar">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.first_name || "User"
                }&background=667eea&color=fff`}
                alt="Avatar"
              />
            </div>
            <div className="user-info">
              <span className="user-name">
                {user?.first_name || user?.email}
              </span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={onLogout} className="logout-btn" title="Logout">
              🚪
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
