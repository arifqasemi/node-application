const express = require('express')
const path = require('path')
const productController = require('../controllers/products')
const homeController = require('../controllers/home')
const errorController = require('../controllers/404')
const CartController = require('../controllers/cart')
const  loginController = require('../controllers/login')
const SignUpController = require('../controllers/signup')
const auth = require('../middleware/auth')


const route = express.Router()
route.get('/',auth,homeController.get);

route.post('/add-product',productController.post);

route.get('/products',productController.get);

route.get('/add-product',productController.addProductView);
route.get('/product-detail/:productId',productController.detailProdcut);

route.get('/update-product/:productId',productController.updateProdcut);


route.get('/cart',CartController.getUserCart);
route.get('/add-to-cart/:productId',CartController.addProductToCart);

route.get('/delete-cart-product/:cartId',CartController.deleteCartProduct);


route.get('/signup',SignUpController.get);
route.post('/signup',SignUpController.post);


route.get('/login',loginController.get);
route.post('/login',loginController.post);
route.get('/logout',loginController.logout);

route.use(errorController.notFound);

module.exports = route;