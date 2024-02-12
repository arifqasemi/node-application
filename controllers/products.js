const Product = require('../models/product')
const User = require('../models/user')






class ProductController{
    constructor(){}


    get(req,res){
        const isAuthenticated = req.session.isLogedIn;

        Product.findAll().then((result) =>{

            res.render('products',{pageTitle:'products',products:result,isAuthenticated:isAuthenticated})
        
            }).catch((error) =>{
                console.log(error)
        
        })
    }


    post(req,res){
        const title = req.body.name;
    const price = req.body.price
    const description = req.body.description
    const imageFile = req.file
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageFile.path,
        description: description,
       
    }).then((result) =>{
         console.log('Product added:');
    res.redirect('/');
    }).catch((error) =>{
        console.log(error)
    })

    }

    addProductView =(req,res) =>{
        const isAuthenticated = req.session.isLogedIn;

        res.render('add-product',{pageTitle:'add product',isAuthenticated})
    }


    detailProdcut =(req,res) =>{
        const isAuthenticated = req.session.isLogedIn;

        const productId = req.params.productId;
        Product.findByPk(productId).then((result)=>{
            res.render('product-detail',{pageTitle:'update',product:result,isAuthenticated})
        }).catch((error)=>{
           console.log(error)
        })

    }
       
    updateProdcut =(req,res) =>{
        const isAuthenticated = req.session.isLogedIn;

        const productId = req.params.productId;
        Product.findById({id:productId}).then((result)=>{
            console.log(result)
    
        }).catch((error)=>{
           console.log(error)
        })
        res.render('update-product',{pageTitle:'update',isAuthenticated:isAuthenticated})
    }

}



module.exports = new ProductController()