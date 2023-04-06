const express = require('express');
const app = express();

// port on which the server will run
const port = 8000;

// require db from mongoose.js in config
const db = require('./config/mongoose')
const todoItems = require('./models/todoItems');

// Set up view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// variables to store
// var todoItemsArray = [];

// Middleware to parse the requests body data of post requests
app.use(express.urlencoded());
// Middleware to parse the requests body data of post requests
app.use(express.urlencoded({extended: true}));
// Middleware to serve static files
app.use(express.static('assets'));

// Show all the items
app.get('/', async function(req, res) {
    try {
        let items = await todoItems.find({});
        let sr = 1;
        return res.render('home', {
            todo_list: items,
            length : items.length,
            sr
        });
    } catch(error) {
        console.log('Error in finding todo item',error );
        return;
    }   
});
// Delete the selected todo item
app.get('/delete-todo-item', async function(req, res) {
    try {
        let id = req.query.id;
        await todoItems.findByIdAndDelete(id);
        
        console.log('Item deleted successfuly');
        return res.redirect('back');
    } catch (error) {
        console.log('Cannot delete the item',error);
    }
});
// Create a new todo item
app.post('/create-todo-item', async function(req, res) {
    try {
        todoItems.create ({
            content: req.body.content,
            dueDate : req.body.dueDate
        });
        console.log('Todo item craeted successfuly');
        return res.redirect('back');
    } catch {
        console.log('Error in creating todo item');
    }
});

// Listen to the specified port
app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
    }
    console.log('Server is up and running on port:', port);
})