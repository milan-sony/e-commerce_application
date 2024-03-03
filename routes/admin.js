var express = require('express');
var router = express.Router();

const productHelper = require('../helpers/product_helpers');
const user_helpers = require('../helpers/user_helpers');

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

router.get('/edit_product', async (req, res) => {

  let productId = req.query.id
  await productHelper.getProductDetails(productId).then((product) => {

    res.render('../views/admin/edit_product.hbs', { product })
  })


})

router.post('/edit_product', (req, res) => {

  let id = req.body.id

  productHelper.updateProduct(req.body).then((result) => {
    res.redirect('/admin')

    if (req.files.image) {
      let image = req.files.image
      image.mv('./public/product_images/' + id + '.jpg')
    }
  })
})

router.get('/view_all_users', (req, res) => {
  user_helpers.getUsersList().then((users) => {

    res.render('../views/admin/view_all_users.hbs', { users, admin: true })
  })
})

module.exports = router;
