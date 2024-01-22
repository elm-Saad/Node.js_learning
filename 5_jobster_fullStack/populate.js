// delete all users or all jobs from DB => start fresh
// populate Database
require('dotenv').config()

const connectDB = require('./db/connect')
const Job = require('./models/Job')
const User = require('./models/User')
const mockData = require('./mock-data.json')




const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        // await User.deleteMany()// start from scratch
        // await Job.deleteMany()// start from scratch
        await Job.create(mockData)

        console.log('populate server running : true');
        process.exit(0) //to exit the process
    } catch (error) {
        console.log("populate error: " + error);
        process.exit(1)
    }
}


start()
// run node populate.js