let { Sequelize, Model, DataTypes, Op } = require('sequelize');

let sequelize = new Sequelize('mysql://root:@localhost/assignment');

sequelize.authenticate()
    .then((data) => { console.log('connected to database') })
    .catch((error) => { console.log('database not connected') })

module.exports = { sequelize, Model, DataTypes, Op }
