const db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')

module.exports = {

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {

            userData.password = await bcrypt.hash(userData.password, 10)
            db.collection(collections.USER_COLLECTIONS).insertOne(userData).then((data) => {
                resolve(data)
            })
        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {

            let response = {}
            let user = await db.collection(collections.USER_COLLECTIONS).findOne({ email: userData.email })

            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("Login Failed")
                        resolve({ status: false })
                    }
                })
            } else {
                console.log('Login failed')
                resolve({ status: false })
            }
        })
    },

    addToCart: (productID, userID) => {
        let productobject = {
            item: new ObjectId(productID),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            let userCart = await db.collection(collections.CART_COLLECTIONS).findOne({ user: new ObjectId(userID) })
            if (userCart) {
                //  checks whether the product being added already exists in the cart by finding its index in the products array of the cart.
                let proExist = userCart.products.findIndex(product => product.item == productID)
                console.log(proExist)
                // If the product exists in the cart, it updates the quantity of that product in the cart by incrementing its quantity by 1 using MongoDB's $inc operator.
                if (proExist != -1) {
                    db.collection(collections.CART_COLLECTIONS).updateOne({ user: new ObjectId(userID), 'products.item': new ObjectId(productID) },
                        {
                            $inc: { 'products.$.quantity': 1 }
                        }).then(() => {
                            resolve()
                        })
                } else {
                    db.collection(collections.CART_COLLECTIONS).updateOne({ user: new ObjectId(userID) },
                        {
                            $push: { products: productobject }
                        }
                    ).then((response) => {
                        resolve()
                    })
                }
            } else {
                let cartObj = {
                    user: new ObjectId(userID),
                    products: [productobject]
                }
                db.collection(collections.CART_COLLECTIONS).insertOne(cartObj).then((response) => {
                    resolve()
                }).catch((error) => {
                    reject(error)
                })
            }
        })
    }
}