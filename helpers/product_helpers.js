const db = require('../config/connection')
const collections = require('../config/collections')

module.exports = {

    addProduct: (product, callback) => {
        // console.log(product)
        db.collection('products').insertOne(product).then((data) => {
            // console.log(data)
            callback(data.insertedId)
        })
    },

    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {

            let products = await db.collection(collections.PRODUCT_COLLECTIONS).find().toArray()

            resolve(products)

        })
    }
}