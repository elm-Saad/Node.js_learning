const Task = require('../models/task')

const getAllTasks = async (req,res)=>{
    try {
        // .find({}) empty object => all tasks
        const tasks = await Task.find({})

        res.status(200).json({tasks})

    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createTasks = async (req,res)=>{
    try {
        /**
         * the req.body is json like name:String,completed:Boolean any other prop other that the 
         * wanted well be ignored
         */
        // create task in the db
        const task = await Task.create(req.body)
        //201 success post request
        res.status(201).json({task})
    } catch (error) {
        // 500 general msg server error
        res.status(500).json({msg:error})
    }

}

const getTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            // 404 no found
            return res.status(404).json({msg:"no task with id " + taskID})
        }
        return res.status(200).json({task})
    } catch (error) {
        //error from mongoose also if the id info is completely random
        res.status(500).json({msg:error})

    }
}

// put => replace existing resource | patch => Parcel update (just updating the some prop and the rest keep the same)
const updateTask = async (req,res)=>{
    try {
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
        return res.status(200).json({task})


    } catch (error) {
        
        res.status(500).json({msg:error})
    }
}

const deleteTask = async(req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Task.findByIdAndDelete({_id:taskID})

        if(!task){
            // 404 no found
            return res.status(404).json({msg:"no task with id " + taskID})
        }
        // task deleted 
        return res.status(200).json({msg:'task deleted'})


    } catch (error) {
        
        res.status(500).json({msg:error})
    }
}


module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTask,
    deleteTask
}