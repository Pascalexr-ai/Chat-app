
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Follow = sequelize.define('Follow', {
  followerId: { type: DataTypes.INTEGER, allowNull: false },
  followingId: { type: DataTypes.INTEGER, allowNull: false }
});

User.hasMany(Follow, { foreignKey: 'followerId' });
User.hasMany(Follow, { foreignKey: 'followingId' });

module.exports = Follow;
