require('dotenv').config()

//async errors

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// middleware

app.use(express.json())

// Routes
app.get('/',(req,res)=>{
    res.send('hi this is store api')
})

// products Route
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT | 5000

const start = async ()=>{
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('server is listening on port ' + port);
        })       
    } catch (error) {
        console.log('server error: ' + error);
    }
}

start()