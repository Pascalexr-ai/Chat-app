
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.TEXT },
  media: { type: DataTypes.STRING },
  parentId: { type: DataTypes.INTEGER, allowNull: true } // for replies
});

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = Comment;
