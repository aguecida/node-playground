const utils = require('./utils');

it('should add two numbers', () => {
    let result = utils.add(33, 11);
    
    if (result !== 44) {
        throw new Error(`Expected 44, but got ${result}`);
    }
});

it('should square a number', () => {
    let result = utils.square(2);

    if (result !== 4) {
        throw new Error(`Expected 4, but got ${result}`);
    }
});