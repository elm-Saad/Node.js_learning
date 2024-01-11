const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default: 7
    },
    createdAT:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['liddy','marcos','ikea','caressa'],
            message:'{VALUE} is not supported',//handle error 
        },
        // enum:['num1','num2','num3','num4'],
    },

})


module.exports = mongoose.model('Product',productSchema)
