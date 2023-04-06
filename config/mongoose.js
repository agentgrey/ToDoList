// require the library
const mongoose = require('mongoose');
// connect to database // used 0.0.0.0 instead of localhost
mongoose.connect('mongodb://0.0.0.0/todo_list_db');

// acquire the connection (to check if it is successful)
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, 'Error connecting to db'));
// up and running
db.once('open', function() {
    console.log('Successfully connected to the db!');
});