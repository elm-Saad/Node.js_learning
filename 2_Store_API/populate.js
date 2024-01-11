// populate all data in products.json to the DB
require('dotenv').config()

const connectDB = require('./db/connect')
const product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await product.deleteMany()// start from scratch
        await product.create(jsonProducts)
        console.log('server running');
        process.exit(0) //to exit the process
    } catch (error) {
        console.log("populate error: " + error);
        process.exit(1)
    }
}


start()
// run node populate.js