import React from "react";

const StatsRow = () => {
  const stats = [
    {
      icon: "📄",
      value: "12",
      label: "Documents",
      trend: "+5.2%",
      trendType: "positive",
    },
    {
      icon: "👥",
      value: "8",
      label: "Collaborators",
      trend: "+12%",
      trendType: "positive",
    },
    {
      icon: "📁",
      value: "3",
      label: "Active Projects",
      trend: "0%",
      trendType: "neutral",
    },
    {
      icon: "⏱️",
      value: "4",
      label: "Pending Reviews",
      trend: "-2.1%",
      trendType: "negative",
    },
  ];

  return (
    <div className="stats-row">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
          <div className={`stat-trend ${stat.trendType}`}>{stat.trend}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
