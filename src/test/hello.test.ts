import * as assert from 'assert';
import {hello} from '../main/hello';

describe('hello', () => {

    it ('should say hello with a name', () => {
        const result = hello('World');
        assert.equal(result, 'Hello, World !');
    });
});
