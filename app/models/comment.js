const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const User = require('./user');
const BlogPost = require('./blogpost');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Comment.belongsTo(User);
Comment.belongsTo(BlogPost);

module.exports = Comment;
