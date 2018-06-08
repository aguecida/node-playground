const request = require('supertest');
const expect = require('expect');

const server = require('./server');

let app = server.app;

describe('Server', () => {
    describe('GET /', () => {
        it('should return hello world response', done => {
            request(app)
                .get('/')
                .expect(404)
                .expect(res => {
                    expect(res.body).toInclude({ error: 'Page not found' });
                })
                .end(done);
        });
    });
    
    describe('GET /users', () => {
        it('should contain myself in user list', done => {
            request(app)
                .get('/users')
                .expect(200)
                .expect(res => {
                    expect(res.body).toInclude({ name: 'Daniele', age: 26 });
                })
                .end(done);
        });
    });
});
