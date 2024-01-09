const mongoose = require('mongoose')


const connectionString = 'mongodb+srv://saad:Fyvcd77HpMOn6ziS@nodeexpressprojects.bpryvjq.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'

mongoose
    .connect(connectionString,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=> console.log('connected to db...........'))
    .catch((err)=>console.log(err))