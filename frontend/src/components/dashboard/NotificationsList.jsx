import React from "react";

const NotificationsList = ({ notifications }) => {
  return (
    <div className="card notifications-card">
      <div className="card-header">
        <h3>Notifications</h3>
        <button className="card-action">Mark all read</button>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.type}`}
          >
            <div className="notification-content">
              <p>{notification.message}</p>
              <small>{notification.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
