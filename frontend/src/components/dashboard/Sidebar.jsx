import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "documents", icon: "📄", label: "Documents" },
    { id: "projects", icon: "📁", label: "Projects" },
    { id: "team", icon: "👥", label: "Team" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "profile", icon: "⚙️", label: "Profile" },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
