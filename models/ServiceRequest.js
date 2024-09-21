const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceRequest = sequelize.define('ServiceRequest', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  manager: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  expected_revenue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 2,
    },
  },
  probability: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      max: 255,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255],
    },
  },
  expected_closing: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255],
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = ServiceRequest;
