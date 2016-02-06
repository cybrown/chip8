import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Stack} from '../main/stack';

describe ('CPU Opcode RET (0x00EE)', () => {

    let stack: Stack;
    let cpu: CPU;

    beforeEach(() => {
        stack = new Stack();
        cpu = new CPU(stack, null, null);
    });

    it ('should remove value from the stack', () => {
        stack.push(0x432);
        cpu.execute(0x00EE);
        assert.equal(stack.length, 0);
    });

    it ('should change PC', () => {
        stack.push(0x432);
        cpu.execute(0x00EE);
        assert.equal(cpu.PC, 0x432);
    });
});
