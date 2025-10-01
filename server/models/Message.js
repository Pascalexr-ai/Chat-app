
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Message = sequelize.define('Message', {
  content: { type: DataTypes.TEXT },
  media: { type: DataTypes.STRING },
});

User.hasMany(Message);
Message.belongsTo(User);

module.exports = Message;
