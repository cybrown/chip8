import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Memory} from '../main/memory';

describe ('CPU Opcode MEMW (0x3XNN)', () => {

    let cpu: CPU;
    let memory: Memory;

    beforeEach(() => {
        const buffer = new Uint8Array(0x1000);
        memory = new Memory(buffer);
        cpu = new CPU(null, memory, null);
    });

    it ('should write V0 in memory at 0x000', () => {
        cpu.registers[0] = 0x42;
        cpu.execute(0xF055);
        assert.equal(memory.readByte(0), 0x42);
    });

    it ('should write V0 in memory at 0xF00', () => {
        cpu.registers[0] = 0x42;
        cpu.I = 0xF00;
        cpu.execute(0xF055);
        assert.equal(memory.readByte(0xF00), 0x42);
    });

    it ('should write V0 in memory at 0xF00 and V1 at 0xF01', () => {
        cpu.registers[0] = 0x42;
        cpu.registers[1] = 0x13;
        cpu.I = 0xF00;
        cpu.execute(0xF155);
        assert.equal(memory.readByte(0xF00), 0x42);
        assert.equal(memory.readByte(0xF01), 0x13);
    });
});
