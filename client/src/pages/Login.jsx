import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import API from '../utils/api';
import '../styles/auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('theme', res.data.user.theme);
      navigate('/feed'); // Redirect to feed after login
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <h2><FaSignInAlt /> Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {errorMsg && (
        <p style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem' }}>
          {errorMsg}
        </p>
      )}

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don’t have an account?{' '}
        <Link to="/signup" style={{ color: '#ff00ff', textDecoration: 'underline' }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;


