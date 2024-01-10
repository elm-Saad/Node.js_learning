const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')

const getAllTasks =asyncWrapper(async (req,res)=>{
    // .find({}) empty object => all tasks
    const tasks = await Task.find({})

    res.status(200).json({tasks})
})

const createTasks =asyncWrapper(async (req,res)=>{
    /**
     * the req.body is json like name:String,completed:Boolean any other prop other that the 
     * wanted well be ignored
     */
    // create task in the db
    const task = await Task.create(req.body)
    //201 success post request
    res.status(201).json({task})
})

const getTask = asyncWrapper( async (req,res)=>{
    
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if(!task){
        // 404 no found
        return res.status(404).json({msg:"no task with id " + taskID})
    }
    res.status(200).json({task})  
})

// put => replace existing resource | patch => Parcel update (just updating the some prop and the rest keep the same)
const updateTask =asyncWrapper( async (req,res)=>{

    const {id:taskID} = req.params
    const task = await Task.findByIdAndUpdate({_id:taskID},req.body,{
        new:true,//return the new item automatically
        runValidators:true, // to run the validator set up when creating the mongoose.Schema in model
        // if u use put method  to add any default value that is un updated
        // overwrite:true
    })

    if(!task){
        // 404 no found
        return res.status(404).json({msg:"no task with id " + taskID})
    }
    // task updated 
    res.status(200).json({task})
})

const deleteTask =asyncWrapper( async(req,res)=>{
   
    const {id:taskID} = req.params
    const task = await Task.findByIdAndDelete({_id:taskID})

    if(!task){
        // 404 no found
        return res.status(404).json({msg:"no task with id " + taskID})
    }
    // task deleted 
    res.status(200).json({msg:'task deleted'})
})

module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTask,
    deleteTask
}