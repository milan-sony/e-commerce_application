var express = require('express');
var router = express.Router();

const productHelper = require('../helpers/product_helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((products) => {

    res.render('../views/admin/view_products', { title: 'Admin Panel', admin: true, products })

  })
});

router.get('/add_product', function (req, res) {

  res.render('../views/admin/add_product')

})

router.post('/add_product', function (req, res) {
  productHelper.addProduct(req.body, (id) => {

    let image = req.files.image

    image.mv('./public/product_images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.redirect('/admin')
      } else {
        console.log("Error" + err)
      }
    })

  })
})

router.get('/delete_product/', (req, res) => {
  // receiving the id from the link req.query.id /URL
  let productId = req.query.id

  productHelper.deleteProduct(productId).then((response) => {
    res.redirect('/admin/')
  })

})

module.exports = router;