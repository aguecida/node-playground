const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp').then(() => {
    console.log('Connected to MongoDB server');
}).catch(err => {
    console.log('Unable to connect to MongoDB server');
});

module.exports = {
    mongoose
};