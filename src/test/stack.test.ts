import {Stack} from '../main/stack';
import * as assert from 'assert';

describe ('Stack', () => {

    let stack: Stack;

    beforeEach(() => stack = new Stack());

    it ('should have a length', () => {
        assert.equal(stack.length, 0);
    });

    it ('should push a value', () => {
        stack.push(42);
        assert.equal(stack.length, 1);
    });

    it ('should push and pop a value', () => {
        stack.push(13);
        const result = stack.pop();
        assert.equal(result, 13);
    });

    it ('should remove a value after a pop', () => {
        stack.push(13);
        const result = stack.pop();
        assert.equal(stack.length, 0);
    });

    it ('should throw if a value > 0xFFF', () => {
        assert.throws(() => stack.push(0x1000));
    });

    it ('should throw if a value < 0', () => {
        assert.throws(() => stack.push(-1));
    });

    it ('should throw on stack overflow', () => {
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        stack.push(1);
        assert.throws(() => stack.push(1));
    });

    it ('should throw on stack underflow', () => {
        assert.throws(() => stack.pop());
    });
});
