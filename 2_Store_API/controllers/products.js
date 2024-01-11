const product = require('../models/product')

/** 
 * //=> with out using custom async error (try catch) throw error will invoke error handle by the require('express-async-errors')
 * //=> throw  new Error('testing async error')
 */

const getALLproductsStatic = async (req,res)=>{
    // get all products
    const AllProducts = await product.find({}) 
    res.status(200).json({AllProducts})
}

const getALLproducts = async (req,res)=>{
    // search Query Params
    //?name=.&....
    
    const {featured} = req.query
    const queryObject = {}

    if(featured){
        //set featured to queryObject
        queryObject.featured = (featured === 'true')?true:false
    }
    const products = await product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {getALLproducts,getALLproductsStatic}