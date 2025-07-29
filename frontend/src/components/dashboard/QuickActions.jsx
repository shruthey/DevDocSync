import React from "react";

const QuickActions = () => {
  const actions = [
    { icon: "➕", label: "New Document", type: "primary" },
    { icon: "👥", label: "Invite Team", type: "secondary" },
    { icon: "📁", label: "Create Project", type: "secondary" },
    { icon: "📊", label: "View Reports", type: "secondary" },
  ];

  return (
    <div className="card quick-actions-card">
      <div className="card-header">
        <h3>Quick Actions</h3>
      </div>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button key={index} className={`action-btn ${action.type}`}>
            <span className="action-icon">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
