const express = require('express')
const app = express()



//static asset (middleware)
app.use(express.static('./public'))



app.get('/',(req,res)=>{
    res.status(200).send('hi there saad')
})



app.listen(5000,()=>{
    console.log('server is running on port 5000')
})