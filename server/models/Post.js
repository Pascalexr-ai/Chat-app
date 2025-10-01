
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
  content: { type: DataTypes.TEXT },
  media: { type: DataTypes.STRING } // image or video URL
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;
