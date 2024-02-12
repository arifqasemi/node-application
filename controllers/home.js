const Product = require('../models/product')
const User = require('../models/user')



class HomeController{




    get(req,res){
        const isAuthenticated = req.session.isLogedIn;
        const mysecret = req.session.isLogedIn;
        console.log(mysecret)

    Product.findAll().then((result)=>{

        res.render('home',{pageTitle:'home',products:result,isAuthenticated:isAuthenticated})


    }).catch((error) =>{
        console.log(error)
    })
        

    }
}



module.exports = new HomeController()