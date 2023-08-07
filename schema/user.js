let { sequelize, Model, DataTypes } = require('../init/dbConnection');

class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summery: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    updated_by:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
    { tableName: "user", modelName: "User", sequelize }
);

module.exports = { User }