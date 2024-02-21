const db = require('../config/connection')

module.exports = {

    addProduct:(product, callback) => {
        // console.log(product)
        db.collection('products').insertOne(product).then((data) => {
            // console.log(data)
            callback(data.insertedId)
        })
    }
}