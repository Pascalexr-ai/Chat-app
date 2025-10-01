
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  type: { type: DataTypes.STRING }, // 'follow', 'message', 'comment', etc.
  message: { type: DataTypes.STRING },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
  relatedId: { type: DataTypes.INTEGER } // ID of related post/message/user
});

User.hasMany(Notification);
Notification.belongsTo(User);

module.exports = Notification;
