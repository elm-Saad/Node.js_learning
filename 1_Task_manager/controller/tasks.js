

const getAllTasks = (req,res)=>{
    
    res.send('get All tasks')
}
const createTasks = (req,res)=>{
    res.send(req.body)

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