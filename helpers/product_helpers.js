const db = require('../config/connection')
const collections = require('../config/collections')
const { ObjectId } = require('mongodb')
const { response } = require('express')

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

    deleteProduct: (productId) => {
        return new Promise((resolve, reject) => {

            db.collection(collections.PRODUCT_COLLECTIONS).deleteOne({ _id: new ObjectId(productId) }).then((response) => {
                resolve()
            })
        })
    },

    getProductDetails: (productId) =>{
        return new Promise((resolve, reject) =>{

            db.collection(collections.PRODUCT_COLLECTIONS).findOne({_id: new ObjectId(productId)}).then((productData) =>{
                resolve(productData)
            })
        })
    },

    updateProduct: (product_details) =>{
        return new Promise((resolve, reject) =>{

            console.log(product_details)
            let productId = product_details.id

            db.collection(collections.PRODUCT_COLLECTIONS).updateOne({_id: new ObjectId(productId)}, {
                $set:{
                    name: product_details.name,
                    category: product_details.category,
                    price: product_details.price,
                    description: product_details.description
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}