// biblioteca sequelize para trabalharmos com o banco de dados mysql
const sequelize = require('sequelize');

// require da conexão com o banco
const connection = require('../database/database');

// Criamos nossa tabela users com o sequelize
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