const Task = require('../models/task')

const getAllTasks = (req,res)=>{
    res.send('get All tasks')
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
        res.status(201).json(task)
    } catch (error) {
        console.log('create task error: ' + error)
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