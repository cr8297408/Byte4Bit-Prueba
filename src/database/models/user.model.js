const { DataTypes, UUIDV4 } = require('sequelize');
const database = require('../connection');

const USERS_TABLE = 'users';

const User = database.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: USERS_TABLE,
    timestamps: true,
  },
);

module.exports = { User, USERS_TABLE };
