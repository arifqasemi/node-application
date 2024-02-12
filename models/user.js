const Sequelize = require('sequelize')
const sequelize = require('../database/database')
const Cart = require('./cart')
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

// User.hasMany(Cart);
module.exports = User