const product = require('../models/product')
/**
 * https://hn.algolia.com/api
 */
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
    
    const {featured,company,name,sort,fields} = req.query
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


    let result = product.find(queryObject)

    /** sorting logic */
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt') // default sort
    }

    // select options => return just the selected props
    if(fields){
        const selectedList = fields.split(',').join(' ')
        result = result.select(selectedList)
    }

    // Skip & Limit => pagination 

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    /**
     * pagination logic => skip number of items base on the page requested
     */
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)



    const products = await result
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {getALLproducts,getALLproductsStatic}