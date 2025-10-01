import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/setting.css';

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('theme');
    navigate('/');
  };

  return (
    <div className="settings-container">
      <h2><FaCog /> Settings</h2>

      <div className="settings-section">
        <h3>🌓 Theme</h3>
        <ThemeToggle />
      </div>

      <div className="settings-section">
        <h3>👤 Account Preferences</h3>
        <p>Coming soon: change email, password, delete account</p>
      </div>

      <div className="settings-section">
        <h3><FaSignOutAlt /> Logout</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Settings;

