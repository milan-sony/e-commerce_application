var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let products = [

    {
      name: "Iphone 11",
      categoty: "mobile",
      description: "This is Iphone 11",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "Iphone 12",
      categoty: "mobile",
      description: "This is Iphone 11",
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "Iphone 13",
      categoty: "mobile",
      description: "This is Iphone 11",
      image: ""
    },
    {
      name: "Iphone 14",
      categoty: "mobile",
      description: "This is Iphone 11",
      image: ""
    },
    {
      name: "Iphone 15",
      categoty: "mobile",
      description: "This is Iphone 11",
      image: ""
    }

  ]

  res.render('index', { products, admin: true });
});

module.exports = router;
