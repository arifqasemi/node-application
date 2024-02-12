const User = require("../models/user");
const bcrypt = require('bcryptjs')


class SignUpController{

    constructor (){

    }

    get(req,res) {
        res.render('signup')

        
    }


    post(req,res) {
        User.findOne({where:{email:req.body.email}}).then((result) =>{
         if(result){
            res.redirect('/signup')
            console.log('the email already exists')
         }else{

            const password = req.body.password
            const email = req.body.email
      
            return bcrypt.hash(password,12).then((hashedPassword) =>{
             const user =    User.create({
                name:req.body.name,
                email:email,
                password:hashedPassword

                })
                return user.save()
            }).then((result) =>{
                res.redirect('/login')

            })
            


         }



        }).catch((error) =>{
            console.log(error)
        })

    

        
    }
}


module.exports = new SignUpController();