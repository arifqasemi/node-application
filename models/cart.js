const Sequelize = require('sequelize')

const sequelize = require('../database/database')
const User = require('./user')


const Cart = sequelize.define('Cart', {
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity:{
        type: Sequelize.FLOAT,
        allowNull:true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    productId:{
        type:Sequelize.FLOAT
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
});



module.exports = Cart;