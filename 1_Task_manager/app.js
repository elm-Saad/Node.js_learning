const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

const connectDB = require('./db/connect')
require('dotenv').config()


const notFound = require('./middleware/NotFound')

//static asset (middleware)
app.use(express.static('./public'))
//middleware for json handle
app.use(express.json())



// get the routes
app.use('/api/v1/tasks',tasks)


app.use(notFound)

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(5000,()=>{
            console.log('server is running on port 5000')
        })
    } catch (error) {
        console.log(error);
        console.log('there was a big error!!!!');
    }
}

start()