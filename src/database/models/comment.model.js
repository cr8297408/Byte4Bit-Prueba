const { DataTypes, UUIDV4 } = require('sequelize');
const database = require('../connection');
const { USERS_TABLE, User } = require('./user.model');

const COMMENTS_TABLE = 'comments';
const Comment = database.define(
  'Comment',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: USERS_TABLE,
        key: 'id',
      },
    },
  },
  {
    tableName: COMMENTS_TABLE,
    timestamps: true,
  },
);

User.hasMany(Comment);
Comment.belongsTo(User);
database.addModel(Comment);

module.exports = {
  Comment,
};
