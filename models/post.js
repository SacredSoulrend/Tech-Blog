const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true, // Content can be optional
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the 'user' model for the user_id foreign key
        key: 'id',     // Refers to the 'id' column in the 'user' model
      },
    },
  },
  {
    sequelize,
    timestamps: true,   
    freezeTableName: true, 
    underscored: true,    
    modelName: 'post',    
  }
);

module.exports = Post;

