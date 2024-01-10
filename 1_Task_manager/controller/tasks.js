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
const getTask = (req,res)=>{
    res.send(req.params)
}
const updateTask = (req,res)=>{
    console.log(req.body);
}
const deleteTask = (req,res)=>{
    console.log(req.params);
}


module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTask,
    deleteTask
}