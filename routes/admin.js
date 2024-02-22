var express = require('express');
var router = express.Router();

const productHelper = require('../helpers/product_helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelper.getAllProducts().then((products) => {

    // console.log(products)

    res.render('../views/admin/view_products', { title: 'Admin Panel', admin: true, products })

  })

});

router.get('/add_product', function (req, res) {

  res.render('../views/admin/add_product')

})

router.post('/add_product', function (req, res) {

  // console.log(req.body)
  // console.log(req.files.image)

  productHelper.addProduct(req.body, (id) => {

    let image = req.files.image
    image.mv('./public/product_images/' + id + '.jpg', (err, done) => {

      if (!err) {
        res.render('../views/admin/view_products.hbs', { title: 'Admin Panel', admin: true })
        // res.send("Product Added")
      } else {
        console.log("Error" + err)
      }

    })

  })
})

module.exports = router;
