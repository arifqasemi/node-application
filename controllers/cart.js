const Product = require('../models/product')
const Cart = require('../models/cart')




class CartController{
    constructor(){}

    getUserCart = (req, res) => {
        const isAuthenticated = req.session.isLogedIn;

        req.user.getCarts().then((carts) => {
            
            res.render('cart', { pageTitle: 'Cart', cartProduct: carts ,isAuthenticated:isAuthenticated});
        }).catch((error) => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
    };




    
   addProductToCart =(req,res) =>{
        const userId = req.user.id;
        const productId = req.params.productId;
        const selectedProduct = []
        Product.findByPk(productId).then((result)=>{
                 selectedProduct.push(result)
            }).catch((error)=>{
            console.log(error)
            })  
            console.log(selectedProduct)
            
       
    
        Cart.findOne({where: {userId: userId,productId:productId }}).then((result) =>{
            if(result){
               const productQuantity = result.quantity + 1;
               result.update({quantity:productQuantity}).then((resl) =>{
                res.redirect('/cart')
                console.log('add successfuly!')
    
               }).catch((error) =>{
                console.log(error)
               })
              
            }else{
                Product.findByPk(productId).then((pro) =>{
                
                   req.user.createCart({
                    product:pro.title,
                    quantity:1,
                    price:pro.price,
                    productId:productId,
                    imageUrl:'dfgdf'
                }).then((result) =>{
                  return  res.redirect('/cart')
                }).catch((error) =>{
                    console.log(error)
                })
    
                }).catch((error) =>{
                    console.log(error)
                })
                
    
            }
        }).catch((error) =>{
            console.log(error)
        })
      
    
    }


    deleteCartProduct = (req,res) =>{
        Cart.findByPk(req.params.cartId)
            .then((result) => {
                if (result) {
                     result.destroy();
                     res.redirect('/cart')
                } else {
                    console.log('Cart not found');
                    res.status(404).send('Cart not found');
                }
            }).catch((error) => {
                console.log(error);
                res.status(500).send('Internal Server Error');
            });
    
    }

}


module.exports = new CartController()