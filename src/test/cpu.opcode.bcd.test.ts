import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Memory} from '../main/memory';

describe ('CPU Opcode BCD (0xFX33)', () => {

    let buffer: Uint8Array;
    let memory: Memory;
    let cpu: CPU;

    beforeEach(() => {
        buffer = new Uint8Array(4096);
        memory = new Memory(buffer);
        cpu = new CPU(null, memory, null);
    });

    it ('should write V5 (123) as BCD in 0x3B6', () => {
        cpu.registers[5] = 123;
        cpu.I = 0x3B6;

        cpu.execute(0xF533);

        assert.equal(buffer[0x3B6], 1);
        assert.equal(buffer[0x3B7], 2);
        assert.equal(buffer[0x3B8], 3);
    });

    it ('should write VE (246) as BCD in 0xCDE', () => {
        cpu.registers[0xE] = 246;
        cpu.I = 0xCDE;

        cpu.execute(0xFE33);

        assert.equal(buffer[0xCDE], 2);
        assert.equal(buffer[0xCDF], 4);
        assert.equal(buffer[0xCE0], 6);
    });

    it ('should write V7 (0) as BCD in 0x426', () => {
        cpu.registers[0x7] = 0;
        cpu.I = 0x426;
        buffer[0x426] = 1;
        buffer[0x427] = 10;
        buffer[0x428] = 100;

        cpu.execute(0xF733);

        assert.equal(buffer[0x426], 0);
        assert.equal(buffer[0x427], 0);
        assert.equal(buffer[0x428], 0);
    });
});
