import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      avatar: "🎉",
      title: "Welcome to DevDocSync!",
      subtitle: "Account created successfully • Just now",
    },
    {
      avatar: "📝",
      title: 'Document "API Guidelines" was updated',
      subtitle: "by John Doe • 2 hours ago",
    },
    {
      avatar: "👥",
      title: 'New team member added to "Frontend Team"',
      subtitle: "by Sarah Wilson • 5 hours ago",
    },
  ];

  return (
    <div className="card activity-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-avatar">{activity.avatar}</div>
            <div className="activity-content">
              <p>
                <strong>{activity.title}</strong>
              </p>
              <small>{activity.subtitle}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
