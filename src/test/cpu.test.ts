import {Memory} from '../main/memory';
import {Stack} from '../main/stack';
import {CPU} from '../main/cpu';
import * as assert from 'assert';

describe ('CPU', () => {

    let buffer: Uint8Array;
    let stack: Stack;
    let memory: Memory;
    let cpu: CPU;

    beforeEach(() => {
        buffer = new Uint8Array(0xFFF);
        stack = new Stack();
        memory = new Memory(buffer);
        cpu = new CPU(stack, memory, null);
    });

    it ('should execute some opcodes from memory', () => {
        buffer[0] = 0x62; buffer[1] = 0x25; // Load 0x25 in V2
        buffer[2] = 0x72; buffer[3] = 0x52; // Add 0x52 to V2
        buffer[4] = 0xA1; buffer[5] = 0x00; // Load 0x100 to I
        buffer[6] = 0xF2; buffer[7] = 0x1E; // Add V2 to I

        cpu.run(4);

        assert.equal(cpu.V2, 0x25 + 0x52);
        assert.equal(cpu.I, 0x100 + 0x25 + 0x52);
    });

    it ('should throw on invalid opcode', () => {
        assert.throws(() => cpu.execute(0));
    });
});
