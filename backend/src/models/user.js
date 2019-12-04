const sequelize = require('sequelize');
const connection = require('../database/database');

const user = connection.define('users',{
    email:{
        type : sequelize.STRING,
        allowNull : false
    },
    senha : {
        type : sequelize.STRING,
        allowNull : false
    }
});

user.sync({force : false});

module.exports = user;