var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product_helpers')
const userHelpers = require('../helpers/user_helpers')

/* GET home page. */
router.get('/', function (req, res, next) {

  let user = req.session.user
  console.log(user)

  productHelper.getAllProducts().then((products) => {
    res.render('../views/user/view_products.hbs', { title: 'Shoping Cart', admin: false, products, user });
  })

});

router.get('/login', (req, res) => {

  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('../views/user/login.hbs', {loginErr : req.session.loginErr})
    req.session.loginErr = false
  }

})

router.post('/login', (req, res) => {

  userHelpers.doLogin(req.body).then((response) => {

    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = "Invalid Username or Password"
      res.redirect('/login')
    }

  })
})

router.get('/signup', (req, res) => {
  res.render('../views/user/signup.hbs')
})

router.post('/signup', (req, res) => {

  userHelpers.doSignup(req.body).then((response) => {
    res.redirect('/login')
  })

})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
