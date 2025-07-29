import React from "react";

const RecentDocuments = () => {
  const documents = [
    {
      icon: "📄",
      title: "Project Requirements",
      subtitle: "Updated 2 hours ago",
      status: "Draft",
      statusType: "draft",
    },
    {
      icon: "📋",
      title: "API Documentation",
      subtitle: "Updated yesterday",
      status: "Published",
      statusType: "published",
    },
    {
      icon: "📊",
      title: "Analytics Report",
      subtitle: "Updated 3 days ago",
      status: "Review",
      statusType: "review",
    },
  ];

  return (
    <div className="card documents-card">
      <div className="card-header">
        <h3>Recent Documents</h3>
        <button className="card-action">Browse All</button>
      </div>
      <div className="documents-list">
        {documents.map((doc, index) => (
          <div key={index} className="document-item">
            <div className="doc-icon">{doc.icon}</div>
            <div className="doc-info">
              <h4>{doc.title}</h4>
              <p>{doc.subtitle}</p>
            </div>
            <div className={`doc-status ${doc.statusType}`}>{doc.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDocuments;
