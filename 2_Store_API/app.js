require('dotenv').config()
require('express-async-errors')
//async errors

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const productsRouter = require('./routes/products')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// middleware

app.use(express.json())

// Routes
app.get('/',(req,res)=>{
    res.send('hi this is store api')
})


app.use('/api/v1/products',productsRouter)

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