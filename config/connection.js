const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/shoppingcart";

module.exports = {

    connect: () => {
        mongoose.connect(url)
            .then(() => {
                console.log("Connected to MongoDB\n");
            }).catch((error) => {
                console.log("MongoDB not connected\n" + error);
            });
    },

    collection: (name) => {
        return mongoose.connection.db.collection(name);
    }
};