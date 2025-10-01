
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaComments,
  FaBell,
  FaCog
} from 'react-icons/fa';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/feed" className="nav-item">
        <FaHome /> <span>Feed</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <FaUser /> <span>Profile</span>
      </NavLink>
      <NavLink to="/chat" className="nav-item">
        <FaComments /> <span>Chat</span>
      </NavLink>
      <NavLink to="/notifications" className="nav-item">
        <FaBell /> <span>Notifications</span>
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        <FaCog /> <span>Settings</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
