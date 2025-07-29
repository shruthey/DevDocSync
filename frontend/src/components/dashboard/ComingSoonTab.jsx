import React from "react";

const ComingSoonTab = ({
  title,
  subtitle,
  featureTitle,
  featureDescription,
}) => {
  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h1>{title}</h1>
        <p className="content-subtitle">{subtitle}</p>
      </div>
      <div className="coming-soon-card">
        <h3>{featureTitle}</h3>
        <p>{featureDescription}</p>
      </div>
    </div>
  );
};

export default ComingSoonTab;
