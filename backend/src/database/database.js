const sequelize = require('sequelize');

const connection = new sequelize('contasimples', 'admin', 'admindev',{
    host : "mysqldev.ckosrb4weggs.sa-east-1.rds.amazonaws.com",
    port : 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})

module.exports = connection;


// Url: mysqldev.ckosrb4weggs.sa-east-1.rds.amazonaws.com
// Porta: 3306
// Login: admin
// Senha: admindev