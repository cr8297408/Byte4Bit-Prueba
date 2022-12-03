const { DataTypes, UUIDV4 } = require('sequelize');
const database = require('../connection');
const { User, USERS_TABLE } = require('./user.model');

const FILMS_TABLE = 'films';
const Film = database.define(
  'Film',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: false,
      references: {
        model: USERS_TABLE,
        key: 'id',
      },
    },
  },
  {
    tableName: FILMS_TABLE,
    timestamps: true,
  }
);

module.exports = {
  Film,
  FILMS_TABLE,
};
