const expect = require('expect');

const utils = require('./utils');

it('should be a number', () => {
    let result = utils.add(1, 2);
    expect(result).toBeA('number');
});

it('should add two numbers', () => {
    let result = utils.add(33, 11);
    expect(result).toBe(44);
});

it('should add two numbers asynchronously', done => {
    utils.asyncAdd(4, 3, sum => {
        expect(sum).toBe(7);
        done();
    });
});

it('should square a number', () => {
    let result = utils.square(2);
    expect(result).toBe(4);
});

it('should square a number asynchronously', done => {
    utils.asyncSquare(3, result => {
        expect(result).toBe(9);
        done();
    });
});

it('should set first and last name', () => {
    let user = {
        location: 'The Wall',
        age: 34
    };
    
    let newUser = utils.setName(user, 'Tyrion Lannister');

    expect(newUser).toBeA('object');
    expect(newUser).toInclude({ firstName: 'Tyrion', lastName: 'Lannister' });
});