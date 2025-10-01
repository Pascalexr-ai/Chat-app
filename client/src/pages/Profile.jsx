import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { FaUserEdit, FaCamera } from 'react-icons/fa';
import '../styles/profile.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsername(res.data.username);
        setBio(res.data.bio || '');
        setPreview(`http://localhost:3000${res.data.profilePicture}`);
      } catch (err) {
        console.error('Profile load failed:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', username);
      formData.append('bio', bio);
      if (profilePicture) formData.append('profilePicture', profilePicture);

      await API.put('/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="profile-container">
      <h2><FaUserEdit /> Edit Profile</h2>
      <div className="profile-form">
        <div className="avatar-preview">
          {preview && <img src={preview} alt="avatar" />}
        </div>
        <label className="file-label">
          <FaCamera /> Change Picture
          <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
        </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={handleUpdate}>Update Profile</button>
      </div>
    </div>
  );
}

export default Profile;

