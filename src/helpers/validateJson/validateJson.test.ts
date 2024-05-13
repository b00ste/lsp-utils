import { expect } from 'chai';
import { validateJson } from './validateJson';

describe('testing `validateJson`', () => {
    it('should revert when passing a string as json', () => {
        const json = 'some random string';

        expect(() => validateJson(json as unknown as object)).to.throw(
            '`object` is not a valid JSON',
        );
    });

    it('should revert when passing a number as json', () => {
        const json = 312321;

        expect(() => validateJson(json as unknown as object)).to.throw(
            '`object` is not a valid JSON',
        );
    });

    it('should pass when passing a valid object as json', () => {
        const json = {
            data: 'some text',
            index: 10,
            value: 'blah blah',
        };

        expect(validateJson(json as unknown as object)).to.equal(json);
    });
});
