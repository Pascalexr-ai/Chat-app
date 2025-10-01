import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import API from '../utils/api';

import "../styles/ThemeToggle.css"

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'cyberpunk' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);

    try {
      const token = localStorage.getItem('token');
      await API.put('/users/theme', { theme: newTheme }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Failed to update theme:', err);
    }
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />} Switch Theme
    </button>
  );
}

export default ThemeToggle;

