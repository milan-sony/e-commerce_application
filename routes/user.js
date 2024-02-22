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
  res.render('../views/user/login.hbs')
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
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

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
