const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const User = require('./user');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

BlogPost.belongsTo(User);

module.exports = BlogPost;
