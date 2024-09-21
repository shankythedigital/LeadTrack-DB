const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
  permissions: {
    type: DataTypes.JSON,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
  },
  company: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
