// populate all data in products.json to the DB
require('dotenv').config()

const connectDB = require('./db/connect')
const Job = require('./models/Job')
const User = require('./models/User')




const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await User.deleteMany()// start from scratch
        await Job.deleteMany()// start from scratch

        console.log('server running (clear all Users and Jobs)');
        process.exit(0) //to exit the process
    } catch (error) {
        console.log("populate error: " + error);
        process.exit(1)
    }
}


start()
// run node populate.js