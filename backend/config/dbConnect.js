const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.DBPORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectTimeout: 86400
  },
});

module.exports = sequelize;
