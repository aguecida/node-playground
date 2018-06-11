const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { todos, users, populateTodos, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('GET /todos', () => {
    it('should get all todos', done => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(3)
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get todo by id', done => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe('First test todo');
            })
            .end(done);
    });

    it('should return 404 if todo not found', done => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 400 for bad id', done => {
        request(app)
            .get('/todos/123')
            .expect(400)
            .end(done);
    });
});

describe('POST /todos', () => {
    it('should create a new todo', done => {
        let text = 'Some todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err => done(err));
            });
    });

    it('should not create todo with invalid data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch(err => done(err));
            });
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete todo by id', done => {
        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe('Second test todo');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(todos[1]._id.toHexString()).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(err => done(err));
            });
    });

    it('should return a 404 if todo not found', done => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 400 for bad id', done => {
        request(app)
            .get('/todos/123')
            .expect(400)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', done => {
        const id = todos[0]._id.toHexString();
        let text = 'Some updated text';
        let completed = true;

        request(app)
            .patch(`/todos/${id}`)
            .send({ text, completed })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(completed);
                expect(typeof res.body.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', done => {
        const id = todos[2]._id.toHexString();
        let text = 'Update to third todo';
        let completed = false;

        request(app)
            .patch(`/todos/${id}`)
            .send({ text, completed })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(completed);
                expect(res.body.completedAt).toBe(null);
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return a user if authenticated', done => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);

    });

    it('should return a 401 if not authenticated', done => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect(res => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', done => {
        let email = 'example@example.com';
        let password = '123456';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect(res => {
                expect(res.body.email).toBe(email);
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
            })
            .end(done);
    });

    it('should return validation errors is request invalid', done => {
        let email = 'bademail';
        let password = '1';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', done => {
        let email = users[0].email;
        let password = '123456';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });
});