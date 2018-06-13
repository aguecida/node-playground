const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let num = 123;
        let result = isRealString(num);
        expect(result).toBeFalsy();
    });

    it('should reject strings with only spaces', () => {
        let str = '        ';
        let result = isRealString(str);
        expect(result).toBeFalsy();
    });

    it('should allow valid, non-whitespace strings', () => {
        let str = 'A valid string';
        let result = isRealString(str);
        expect(result).toBeTruthy();
    });
});