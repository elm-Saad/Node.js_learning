
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

const connectDB = require('./db/connect')


//static asset (middleware)
app.use(express.static('./public'))
//middleware for json handle
app.use(express.json())



// get the routes
app.use('/api/v1/tasks',tasks)



const start = async ()=>{
    try {
        await connectDB()
        app.listen(5000,()=>{
            console.log('server is running on port 5000')
        })
    } catch (error) {
        console.log(error);
    }
}

start()