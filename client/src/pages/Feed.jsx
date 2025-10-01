import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import {
  FaUserCircle,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaPlusCircle,
  FaPaperclip,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import '../styles/Feed.css';

function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const [modalMedia, setModalMedia] = useState(null);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const createPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('content', content);
      if (file) formData.append('media', file);

      await API.post('/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setContent('');
      setFile(null);
      fetchPosts();
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await API.get(`/users/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      {/* Search Bar */}
      <h2><FaSearch /> Search Users</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading-text">Searching...</p>}
      {searchResults.length > 0 && (
        <>
          <button onClick={() => setSearchResults([])} className="clear-btn">
            Clear Results
          </button>
          <div className="search-results">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="search-user"
                onClick={() => window.location.href = `/profile/${user.id}`}
              >
                <FaUserCircle /> {user.username}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Post Form */}
      <h2><FaPlusCircle /> Create Post</h2>
      <div className="post-form">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label className="file-label">
          <FaPaperclip /> Attach file
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*,video/*"
          />
        </label>
        <button onClick={createPost}>Post</button>
      </div>

      {/* Feed */}
      <h2>🧬 Cyber Feed</h2>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <FaUserCircle size={24} />
            <span>{post.User?.username || 'Anonymous'}</span>
            <span className="timestamp">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <p>{post.content}</p>
          {post.media && (
            <div
              className="post-media-card"
              onClick={() => setModalMedia(`http://localhost:3000${post.media}`)}
            >
              {post.media.endsWith('.mp4') ? (
                <video src={`http://localhost:3000${post.media}`} muted />
              ) : (
                <img src={`http://localhost:3000${post.media}`} alt="media" />
              )}
              <p className="click-to-view">Click to view</p>
            </div>
          )}
          <div className="post-actions">
            <FaHeart className="icon" />
            <FaComment className="icon" />
            <FaShareAlt className="icon" />
          </div>
        </div>
      ))}

      {/* Modal Viewer */}
      {modalMedia && (
        <div className="media-modal" onClick={() => setModalMedia(null)}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setModalMedia(null)}>
              <FaTimes />
            </button>
            {modalMedia.endsWith('.mp4') ? (
              <video controls src={modalMedia} />
            ) : (
              <img src={modalMedia} alt="media" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;



