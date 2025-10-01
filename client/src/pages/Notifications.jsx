import React, { useState, useEffect } from 'react';
import { FaBell, FaUserPlus, FaHeart, FaCommentDots } from 'react-icons/fa';
import '../styles/notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data for now
    setNotifications([
      { id: 1, type: 'follow', message: 'Neo followed you.' },
      { id: 2, type: 'like', message: 'Trinity liked your post.' },
      { id: 3, type: 'comment', message: 'Morpheus commented: "You are the One."' }
    ]);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'follow': return <FaUserPlus />;
      case 'like': return <FaHeart />;
      case 'comment': return <FaCommentDots />;
      default: return <FaBell />;
    }
  };

  return (
    <div className="notifications-container">
      <h2><FaBell /> Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((note) => (
            <li key={note.id} className="notification-item">
              {getIcon(note.type)}
              <span>{note.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;

