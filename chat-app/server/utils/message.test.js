const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'User';
        let text = 'Some text from User';
        let message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        let from = 'Admin';
        let latitude = 123;
        let longitude = 456;
        let url = 'https://www.google.com/maps?q=123,456';
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(typeof message.createdAt).toBe('number');
    });
});