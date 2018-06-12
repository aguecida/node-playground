const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'daniele@upstreamworks.com',
        password: 'userOnePassword',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'jon@upstreamworks.com',
        password: 'userTwoPassword',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
            }
        ]
    }
];

const todos = [
    { _id: new ObjectID(), text: 'First test todo', _creator: userOneId },
    { _id: new ObjectID(), text: 'Second test todo', _creator: userTwoId },
    { _id: new ObjectID(), text: 'Third test todo', completed: true, completedAt: 333, _creator: userTwoId }
];

let populateTodos = done => {
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done());
};

let populateUsers = done => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([ userOne, userTwo ]);
    }).then(() => done());
};

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
};