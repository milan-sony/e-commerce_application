var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product_helpers')
const userHelpers = require('../helpers/user_helpers')
const { ObjectId } = require('mongodb')

// creating a middleware for varify login
const varifyLogin = (req, res, next) => {

  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', async function (req, res, next) {

  let user = req.session.user

  let cartCount = null

  if (user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id)
  }

  productHelper.getAllProducts().then((products) => {
    res.render('../views/user/view_products.hbs', { title: 'Shoping Cart', admin: false, products, user, cartCount });
  })
});

router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('../views/user/login.hbs', { loginErr: req.session.loginErr })
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

    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/login')
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/cart', varifyLogin, async (req, res) => {
  let products = await userHelpers.getCartProducts(req.session.user._id)
  res.render('../views/user/cart.hbs', { products, user: req.session.user })
})

router.get('/add_to_cart/:id', (req, res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    // check javascript folder -- ajax
    res.json({ status: true })
  })
})

router.post('/change_product_quantity', (req, res)=>{
  // req.body contains the the data from changeQuantity() in cart.hbs
  userHelpers.changeProductQuantity(req.body).then((response)=>{
    res.json(response)
  })
})

module.exports = router;
