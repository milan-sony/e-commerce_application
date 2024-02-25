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

    addToCart: (productId, userId)=>{
        return new Promise((resolve, reject) => {

            let usercart = db.collection(collections.CART_COLLECTION).findOne({user: ObjectId(userId)})
            if(usercart){

            }else{
                let cartObj = {
                    user: ObjectId(userId),
                    products: [ObjectId(productId)]
                }
            }
        })
    }

}