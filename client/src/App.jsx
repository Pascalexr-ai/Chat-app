import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import '../src/styles/global.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Toggle button for mobile */}
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: '#ff00ff',
            cursor: 'pointer',
            padding: '1rem',
            display: 'none'
          }}
        >
          ☰
        </button>

        <div style={{ display: 'flex' }}>
          <Sidebar sidebarOpen={sidebarOpen} />
          <div style={{ marginLeft: '180px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


