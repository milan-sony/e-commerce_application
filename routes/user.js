var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product_helpers')

/* GET home page. */
router.get('/', function (req, res, next) {

  productHelper.getAllProducts().then((products) => {

    res.render('../views/user/view_products.hbs', { title: 'Shoping Cart', products, admin: false });

  })

  
});

module.exports = router;
