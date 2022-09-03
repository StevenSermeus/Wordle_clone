const dbConfig  = require('../config/db');
const Sequelize = require('sequelize');
const db = {}

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: process.env.NODE_ENV === 'production' ? false : console.log
});


db.sequelize = sequelize;
db.models = {};
db.models.User = require('./user')(sequelize, Sequelize);

module.exports = db;