const mongoose = require('mongoose');
// schema of the data
const todoListSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    dueDate: {
        type: String
    }
});

const todoItems = mongoose.model('todoItems', todoListSchema);
module.exports = todoItems;