const mongoose = require('mongoose');
const todo = new mongoose.Schema({
    // email: {type: String, required: true},
    task: {type: String, required:true},
    start_date: {type: Date, required:true},
    due_date: {type: Date, required:true},
    is_active: {type: Boolean, required:true},
}, {timestamps: true});

module.exports = mongoose.model('Todo',todo)