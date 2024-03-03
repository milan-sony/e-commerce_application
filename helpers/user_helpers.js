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
    },

    getCartProducts: (userID) => {
        return new Promise(async (resolve, reject) => {

            let cartItems = await db.collection(collections.CART_COLLECTIONS).aggregate([
                {
                    // $match: Filters documents based on the provided userID.
                    $match: { user: new ObjectId(userID) }
                },
                {
                    // $unwind: Deconstructs the products array within each document
                    $unwind: '$products'
                },
                {
                    // $project: Reshapes documents to only include item and quantity fields.
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    // $lookup: Performs a left outer join with the PRODUCT_COLLECTIONS collection to retrieve product details based on the item field. (same as of join in sql)
                    $lookup: {
                        from: collections.PRODUCT_COLLECTIONS,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    // stage to further shape the output, extracting the first element of the product array and discarding the rest.
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$product', 0] }
                    }
                }
            ]).toArray()
            // console.log(cartItems)
            resolve(cartItems)
        })
    },

    getCartCount: (userID) => {
        return new Promise(async (resolve, reject) => {

            let count = 0

            let cart = await db.collection(collections.CART_COLLECTIONS).findOne({ user: new ObjectId(userID) })

            if (cart) {
                count = cart.products.length
            }
            resolve(count)
        })
    },

    changeProductQuantity: (productDetails) => {

        productDetails.count = parseInt(productDetails.count)
        productDetails.quantity = parseInt(productDetails.quantity)

        return new Promise((resolve, reject) => {

            if (productDetails.count == -1 && productDetails.quantity == 1) {
                // removing the cart item
                db.collection(collections.CART_COLLECTIONS).updateOne({ _id: new ObjectId(productDetails.cart) },
                    {
                        $pull: { products: { item: new ObjectId(productDetails.product) } }
                    }
                ).then((response) => {
                    resolve({ removeProduct: true })
                })
            } else {
                // increment or decrement the the quantity
                db.collection(collections.CART_COLLECTIONS).updateOne({ _id: new ObjectId(productDetails.cart), 'products.item': new ObjectId(productDetails.product) }, {
                    $inc: { 'products.$.quantity': productDetails.count }
                }).then((response) => {
                    resolve({ status: true })
                })
            }
        })
    },

    removeCartProduct: (productDetails) => {
        return new Promise((resolve, reject) => {

            db.collection(collections.CART_COLLECTIONS).updateOne({ _id: new ObjectId(productDetails.cart) },
                {
                    $pull: { products: { item: new ObjectId(productDetails.product) } }
                }
            ).then((response) => {
                resolve(response)
            })
        })
    },

    getTotalAmount: (userID) => {
        return new Promise(async (resolve, reject) => {

            let total = await db.collection(collections.CART_COLLECTIONS).aggregate([

                {
                    // $match: Filters documents based on the provided userID.
                    $match: { user: new ObjectId(userID) }
                },
                {
                    // $unwind: Deconstructs the products array within each document
                    $unwind: '$products'
                },
                {
                    // $project: Reshapes documents to only include item and quantity fields.
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    // $lookup: Performs a left outer join with the PRODUCT_COLLECTIONS collection to retrieve product details based on the item field. (same as of join in sql)
                    $lookup: {
                        from: collections.PRODUCT_COLLECTIONS,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    // stage to further shape the output, extracting the first element of the product array and discarding the rest.
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$product', 0] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: { $multiply: ['$quantity', { '$toInt': '$product.price' }] } }
                    }
                }
            ]).toArray()
            resolve(total[0].total)
        })
    },

    placeOrder: (orderDetails, products, totalAmount) => {
        return new Promise((resolve, reject) => {

            let status = orderDetails.payment_method === 'COD' ? 'placed' : 'pending'

            let orderObj = {
                dateTime: new Date(),
                deliveryDetails: {
                    address: orderDetails.address,
                    pincode: orderDetails.pincode,
                    phone: orderDetails.phone
                },
                userID: new ObjectId(orderDetails.userID),
                paymentMethod: orderDetails.payment_method,
                products: products,
                totalAmount: totalAmount,
                status: status
            }

            db.collection(collections.ORDER_COLLECTIONS).insertOne(orderObj).then((response) => {
                // after the insertion the cart is deleted
                db.collection(collections.CART_COLLECTIONS).deleteOne({ user: new ObjectId(orderDetails.userID) })
                resolve()
            })
        })
    },

    getCartProductList: (userID) => {
        return new Promise(async (resolve, reject) => {
            let cart = await db.collection(collections.CART_COLLECTIONS).findOne({ user: new ObjectId(userID) })
            resolve(cart.products)
        })
    },

    getUserOrders: (userID) => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.collection(collections.ORDER_COLLECTIONS).find({ userID: new ObjectId(userID) }).toArray()
            resolve(orders)
        })
    },

    getOrderProducts: (orderID) => {
        return new Promise(async (resolve, reject) => {
            let orderItems = await db.collection(collections.ORDER_COLLECTIONS).aggregate([
                {
                    $match: { _id: new ObjectId(orderID) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_COLLECTIONS,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: { $arrayElemAt: ['$product', 0] }
                    }
                }
            ]).toArray()
            resolve(orderItems)
        })
    },

    getUsersList: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.collection(collections.USER_COLLECTIONS).find().toArray()
            resolve(users)
        })
    }
}