const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// const id = '5b1cb64e3f93ee2cb089a67811';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
//     return;
// }

// Todo.find({
//     _id: id
// }).then(todos => {
//     console.log('Todos:', todos);
// });

// Todo.findOne({
//     _id: id
// }).then(todo => {
//     console.log('Todo:', todo);
// });

// Todo.findById(id).then(todo => {
//     if (!todo) {
//         console.log('Id not found');
//         return;
//     }

//     console.log('Todo by id:', todo);
// }).catch(err => {
//     console.log(err);
// });

const id = '5b1b67a33e3c5c32987ac2b1';

User.findById(id).then(user => {
    if (!user) {
        console.log('User not found');
        return;
    }
    
    console.log('User:', user);
}).catch(err => {
    console.log(err);
})