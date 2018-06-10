const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then(result => {
//     console.log(result);
// });

//Todo.findOneAndRemove

Todo.findByIdAndRemove('5b1d96464aa8a462ec1493e5').then(todo => {
    console.log(todo);
});