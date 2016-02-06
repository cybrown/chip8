import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Stack} from '../main/stack';

describe ('CPU Opcode CALL (0x2NNN)', () => {

    let stack: Stack;
    let cpu: CPU;

    beforeEach(() => {
        stack = new Stack();
        cpu = new CPU(stack, null, null);
    });

    it ('should append value on the stack', () => {
        cpu.PC = 4;
        cpu.execute(0x2123);
        assert.equal(stack.length, 1);
        assert.equal(stack.pop(), 6);
    });

    it ('should change PC', () => {
        cpu.PC = 4;
        cpu.execute(0x2123);
        assert.equal(cpu.PC, 0x123);
    });
});
