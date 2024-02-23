const db = require('../config/connection')
const collections = require('../config/collections')
const {ObjectId}=require('mongodb') 

module.exports = {

    addProduct: (product, callback) => {

        db.collection('products').insertOne(product).then((data) => {
            callback(data.insertedId)
        })
    },

    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {

            let products = await db.collection(collections.PRODUCT_COLLECTIONS).find().toArray()
            resolve(products)

        })
    },

    deleteProduct: (productId) =>{
        return new Promise((resolve, reject) =>{
            db.collection(collections.PRODUCT_COLLECTIONS).deleteOne({_id:new ObjectId(productId)}).then((response)=>{
                console.log(response)
                resolve()
            })
        })

    }
}