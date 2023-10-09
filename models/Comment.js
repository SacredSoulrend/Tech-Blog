const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the 'user' model for the user_id foreign key
        key: 'id',     // Refers to the 'id' column in the 'user' model
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // References the 'post' model for the post_id foreign key
        key: 'id',     // Refers to the 'id' column in the 'post' model
      },
    },
  },
  {
    sequelize,
    timestamps: true,   
    freezeTableName: true, 
    underscored: true,    
    modelName: 'comment', 
  }
);

module.exports = Comment;

