const { DataTypes, UUIDV4 } = require('sequelize');
const database = require('../connection');
const { USERS_TABLE, User } = require('./user.model');

const CATEGORIES_TABLE = 'categories';
const Categorie = database.define(
  'Categorie',
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
    tableName: CATEGORIES_TABLE,
    timestamps: true,
  },
);

User.hasMany(Categorie);
Categorie.belongsTo(User);

module.exports = {
  Categorie,
  CATEGORIES_TABLE,
};
