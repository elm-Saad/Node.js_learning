const mongoose = require('mongoose')


const connectionString = 'mongodb+srv://saad:NEWSTX@nodeexpressprojects.bpryvjq.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'


const connectDB = ()=>{
        
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}

module.exports = connectDB