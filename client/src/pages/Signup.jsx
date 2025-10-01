
import React, { useState } from 'react';
import API from '../utils/api';
import '../styles/auth.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await API.post('/auth/signup', { username, email, password });
      alert('Account created! You can now log in.');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>🆕 Signup</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
