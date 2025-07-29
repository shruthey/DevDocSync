import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./dashboard/NavigationBar";
import Sidebar from "./dashboard/Sidebar";
import OverviewTab from "./dashboard/OverviewTab";
import ProfileTab from "./dashboard/ProfileTab";
import ComingSoonTab from "./dashboard/ComingSoonTab";

const Dashboard = () => {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    {
      id: 1,
      type: "info",
      message: "Welcome to DevDocSync!",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "success",
      message: "Profile updated successfully",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "warning",
      message: "Document review pending",
      time: "3 hours ago",
    },
  ]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab user={user} notifications={notifications} />;
      case "profile":
        return <ProfileTab user={user} updateProfile={updateProfile} />;
      case "documents":
        return (
          <ComingSoonTab
            title="Documents"
            subtitle="Manage your documents and files."
            featureTitle="📄 Documents Management"
            featureDescription="This feature is coming soon! You'll be able to create, edit, and organize your documents here."
          />
        );
      case "projects":
        return (
          <ComingSoonTab
            title="Projects"
            subtitle="Organize your work into projects."
            featureTitle="📁 Project Management"
            featureDescription="Create and manage projects to organize your documentation workflow."
          />
        );
      case "team":
        return (
          <ComingSoonTab
            title="Team"
            subtitle="Collaborate with your team members."
            featureTitle="👥 Team Collaboration"
            featureDescription="Invite team members, assign roles, and collaborate on documents together."
          />
        );
      case "analytics":
        return (
          <ComingSoonTab
            title="Analytics"
            subtitle="Track your productivity and insights."
            featureTitle="📊 Analytics Dashboard"
            featureDescription="View detailed analytics about your documentation activities and team performance."
          />
        );
      default:
        return <OverviewTab user={user} notifications={notifications} />;
    }
  };

  return (
    <div className="dashboard">
      <NavigationBar
        user={user}
        notifications={notifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogout={handleLogout}
      />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="dashboard-main">{renderTabContent()}</main>
    </div>
  );
};

export default Dashboard;
