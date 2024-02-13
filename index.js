const router = require('./routes/router')
const express = require('express')
const db = require('./database/database')
const sequelize = require('./database/database')
const Product = require('./models/product')
const User = require('./models/user')
const bodyParser = require('body-parser');
const Cart = require('./models/cart')
const session = require('express-session')
const multer = require('multer')
const fs = require('fs');

app = express();

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
}))
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, getRandomNumber(0,1001) + '-' + file.originalname);
  }
});

const filter = (req,file,cb)=>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null,true)
  }else{
    cb(null,false)
  }

}

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static('public'));
app.use('/images',express.static('images'));

app.use(express.urlencoded({ extended: true }))
app.use(multer({storage:fileStorage,fileFilter:filter}).single('image'))

// In Product model file
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product);
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Cart);



// app.use((req, res, next) => {
//   User.findByPk(12)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(router)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// sequelize
//   //   .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com',passowrd:'123456' });
//     }
//     return user;
//   })



