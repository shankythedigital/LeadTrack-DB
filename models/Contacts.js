const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 255],
    },
  },
  contactOwner: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 255],
    },
  },
  assignee: {
    type: DataTypes.JSON,
  },
  priority: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 255],
    },
  },
  companySize: {
    type: DataTypes.INTEGER,
  },
  jobTitle: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 255],
    },
  },
  expectedRevenue: {
    type: DataTypes.FLOAT,
  },
  expectedClosing: {
    type: DataTypes.DATE,
  },
  probability: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 255],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 255],
    },
  },
  lastActivity: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Contact;
