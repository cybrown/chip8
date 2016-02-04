import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode SE, SNE (0x3XNN, 0x4XNN, 0x5XYN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('should skip next opcode if V5 = 0x42', () => {
        cpu.registers[0x5] = 0x42;
        cpu.PC = 18;
        cpu.execute(0x3542);
        assert.equal(cpu.PC, 22);
    });

    it ('should not skip next opcode if V5 != 0x42', () => {
        cpu.registers[0x5] = 0x41;
        cpu.PC = 18;
        cpu.execute(0x3542);
        assert.equal(cpu.PC, 20);
    });

    it ('should skip next opcode if V3 != 0x43', () => {
        cpu.registers[0x3] = 0x41;
        cpu.PC = 46;
        cpu.execute(0x4343);
        assert.equal(cpu.PC, 50);
    });

    it ('should not skip next opcode if V3 = 0x43', () => {
        cpu.registers[0x3] = 0x43;
        cpu.PC = 46;
        cpu.execute(0x4343);
        assert.equal(cpu.PC, 48);
    });

    it ('should skip next opcode if V9 = VD', () => {
        cpu.registers[0x9] = 0x13;
        cpu.registers[0xD] = 0x13;
        cpu.PC = 32;
        cpu.execute(0x59D0);
        assert.equal(cpu.PC, 36);
    });

    it ('should not skip next opcode if V9 != VD', () => {
        cpu.registers[0x9] = 0x13;
        cpu.registers[0xD] = 0x130;
        cpu.PC = 32;
        cpu.execute(0x59D0);
        assert.equal(cpu.PC, 34);
    });

    it ('should throw if N != 0 in opcode like 0x5XYN', () => {
        assert.throws(() => cpu.execute(0x5AB4));
    });
});
