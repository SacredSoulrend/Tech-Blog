const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

module.exports = sequelize;
