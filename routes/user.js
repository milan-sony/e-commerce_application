var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product_helpers')
const userHelpers = require('../helpers/user_helpers')

/* GET home page. */
router.get('/', function (req, res, next) {

  productHelper.getAllProducts().then((products) => {
    res.render('../views/user/view_products.hbs', { title: 'Shoping Cart', products, admin: false });
  })

});

router.get('/login', (req, res) => {
  res.render('../views/user/login.hbs')
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
  // res.send("Success")
})

router.get('/signup', (req, res) => {
  res.render('../views/user/signup.hbs')
})

router.post('/signup', (req, res) => {

  userHelpers.doSignup(req.body).then((response) => {
    console.log(response)
    res.send("Data saved")
  })

})

module.exports = router;
