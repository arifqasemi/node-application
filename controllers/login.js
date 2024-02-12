const User = require("../models/user");
const bcrypt = require('bcryptjs')



class LoginControl{

    constructor (){

    }

    get(req,res) {
        res.render('login')

        
    }


    post(req, res) {
        const password = req.body.password;
    
        User.findOne({ where: { email: req.body.email } }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((result) => {
                    if (result) {
                        req.session.isLogedIn = true;
                        req.session.user = user;
                        res.redirect('/'); // Redirect after successful login
                    } else {
                        res.redirect('/login'); // Redirect if the password is incorrect
                    }
                }).catch((error) => {
                    console.log(error);
                    res.redirect('/login');
                });
            } else {
                // Redirect if user is not found
                res.redirect('/login');
            }
        }).catch((error) => {
            console.log(error);
    
            // Render 'login' view in case of an error
            res.render('/login');
        });
    }


    logout = (req, res, next) => {
        req.session.destroy(err => {
        //   console.log(err);
          res.redirect('/login');
        });
      };
      
    
}


module.exports = new LoginControl();