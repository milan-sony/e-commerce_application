const db = require('../config/connection')
const collections = require('../config/collections')
const bcrypt = require('bcrypt')

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
            let loginStatus = false
            let response = {}
            let user = await db.collection(collections.USER_COLLECTIONS).findOne({ email: userData.email })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log("Login Success")
                        response.user=user
                        response.status=true
                        resolve(response)
                    } else {
                        console.log("Login Failed")
                        resolve({status:false})
                    }
                })
            } else {
                console.log('Login failed')
                resolve({status:false})
            }
        })
    }

}