
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

require('./db/connect')


//static asset (middleware)
app.use(express.static('./public'))
//middleware for json handle
app.use(express.json())



// get the routes
app.use('/api/v1/tasks',tasks)







app.listen(5000,()=>{
    console.log('server is running on port 5000')
})