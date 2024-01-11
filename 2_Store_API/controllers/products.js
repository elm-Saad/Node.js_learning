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
    // search Query Params filtering
    //?name=.&....
    
    const {featured,company,name} = req.query
    const queryObject = {}

    if(featured){
        //set featured to queryObject
        queryObject.featured = (featured === 'true')?true:false
    }
    if(company){
        queryObject.company = company
    }

    if(name){
        /**
         * not locking for the exact name but for the pattern of the name and option i => case insensitive
         */
        queryObject.name = {$regex: name, $options:'i'}
    }
    /** sorting */
    



    const products = await product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {getALLproducts,getALLproductsStatic}