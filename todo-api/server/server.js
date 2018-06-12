require('./config/config'); // Configure the env this server is running on

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

let app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// Get all todos
app.get('/todos', authenticate, (req, res) => {
    Todo.find({ _creator: req.user._id }).then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Get todo by id
app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Invalid id');
    }

    Todo.findOne({ _id: id, _creator: req.user._id }).then(todo => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }

        res.send(todo);
    }).catch(err => {
        res.status(500).send(err);
    })
});

// Create todo
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(400).send(err);
    });
});

// Delete todo by id
app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Invalid id');
    }

    Todo.findOneAndRemove({ _id: id, _creator: req.user._id }).then(todo => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }

        res.send(todo);
    }).catch(err => {
        res.status(500).send('Unable to delete todo');
    });
});

// Update todo by id
app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, [ 'text', 'completed' ]); // Only allow update of these properties

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Invalid id');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then(todo => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }

        res.send(todo);
    }).catch(err => {
        res.status(500).send('Unable to update todo');
    });
});

// Create user
app.post('/users', (req, res) => {
    let body = _.pick(req.body, [ 'email', 'password' ]); // Only grab email and password
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then(token => {
        res.header('x-auth', token).send(user);
    }).catch(err => {
        res.status(400).send(err);
    });
});

// Get details of authenticated user
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, [ 'email', 'password' ]);

    User.findByCredentials(body.email, body.password).then(user => {
        return user.generateAuthToken().then(token => {
            res.status(200).header('x-auth', token).send(user);
        });
    }).catch(() => {
        res.status(401).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};