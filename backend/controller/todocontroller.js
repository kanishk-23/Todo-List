const Todo = require("../model/todo");

const getAllTodos = async (req, res) => {
    try{
        const todos = await Todo.find({email: req.user.email});
        res.status(200).json({success:true, data:todos});
    }
    catch(err){
        res.status(400).json({success:false, message:'Server error'});
    }
};  

// const getTodo = async (req, res) => {
//     try{
//         const {id} = req.params;
//         const todo = await Todo.findById(id);
//         res.status(200).json({success:true, data:todo});
//     }
//     catch(err){
//         res.status(400).json({success:false, message:'Server error'});
//     }
// };

const createNewTodo = async (req, res) => {
    try{
        email = req.user.email;
        const data = req.body;

        // basic validation
        data.task = data.task.trim();
        if(!data.task || !data.start_date || !data.due_date) throw new Error("All the fields are required");

        // date parsing
        start_date = new Date(data.start_date)
        due_date = new Date(data.due_date)
        if(isNaN(start_date) || isNaN(due_date)){
            return res.status(400).json({success:false, message: 'Invalid Date'});
        }
        if(start_date> due_date){
            return res.status(400).json({success:false, message: 'Start date should be before Due date'});
        }

        const current_date = new Date();
        current_date.setHours(0, 0, 0, 0);
        const is_active = !(due_date< current_date);
        const newtodo = new Todo({
            email:email,
            task: data.task,
            start_date: start_date,
            due_date: due_date,
            is_active: is_active,
        })
        await newtodo.save();
        res.status(200).json({success:true, message:'New task created successfully' , data: newtodo});

    }catch (err) {
        res.status(400).json({success:false, message:err.message});
    }
};  

const updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const allowedFields = ['task', 'due_date', 'start_date', 'is_active'];
        const keys = Object.keys(data);
        for (const key of keys){
            if (!allowedFields.includes(key))  return res.status(400).json({success: false, message: `Field '${key}' cannot be modified or does not exist`});
        }
        // fetching task details
        const todo = await Todo.findById(id);
        if(!todo) return res.status(400).json({success:false, message:'Task not found'});
        if ('task' in data) todo.task = data.task.trim();
        // date parsing
        if ('start_date' in data || 'due_date' in data) {
            const new_start_date = 'start_date' in data ? new Date(data.start_date) : todo.start_date;
            const new_due_date = 'due_date' in data ? new Date(data.due_date) : todo.due_date;
            if (isNaN(new_start_date.getTime()) || isNaN(new_due_date.getTime()))
                return res.status(400).json({ success: false, message: 'Invalid Date' });
            if (new_start_date > new_due_date)
                return res.status(400).json({success: false, message: 'Start date must not be after due date.'});
            todo.start_date = new_start_date;
            todo.due_date = new_due_date;
        }

        if ('is_active' in data) todo.is_active = data.is_active;
        
        const current_date = new Date();
        current_date.setHours(0, 0, 0, 0);
        if(todo.due_date< current_date) todo.is_active = false;

        await todo.save();
        res.status(200).json({success:true, message:'Task updated successfully' , data: todo});

    }catch (err) {
        res.status(400).json({success:false, message:err.message});
    }
};  

const deleteTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo) return res.status(400).json({success:false, message:'Task not found'});
        res.status(200).json({success:true, message:'Deleted task'});
    }
    catch(err){
        res.status(400).json({success:false, message:'Server error'});
    }
};  

module.exports = {
  getAllTodos,
//   getTodo,
  createNewTodo,
  updateTodo,
  deleteTodo,
};