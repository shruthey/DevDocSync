import React from "react";
import StatsRow from "./StatsRow";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import RecentDocuments from "./RecentDocuments";
import NotificationsList from "./NotificationsList";

const OverviewTab = ({ user, notifications }) => {
  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>Welcome back, {user?.first_name || "User"}! 👋</h1>
        <p className="content-subtitle">
          Here's what's happening with your projects today.
        </p>
      </div>

      <StatsRow />

      <div className="dashboard-grid">
        <RecentActivity />
        <QuickActions />
        <RecentDocuments />
        <NotificationsList notifications={notifications} />
      </div>
    </div>
  );
};

export default OverviewTab;
