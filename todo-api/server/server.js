const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp').then(() => {
    console.log('Connected to MongoDB server');
}).catch(err => {
    console.log('Unable to connect to MongoDB server');
});

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

let newTodo = new Todo({
    text: '    Something to do    '
});

newTodo.save().then(doc => {
    console.log('Saved todo', doc);
}).catch(err => {
    console.log('Unable to save todo', err);
});

let newUser = new User({
    email: 'test@gmail.com'
});

newUser.save().then(doc => {
    console.log('Saved user', doc);
}).catch(err => {
    console.log('Unable to save user', err);
});