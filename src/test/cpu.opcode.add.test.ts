import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode ADD (0x7XNN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null);
    });

    it ('should add 34 to V3', () => {
        cpu.execute(0x7322);
        assert.equal(cpu.V3, 34);
    });

    it ('should add 123 to VB, with initial value of 21', () => {
        cpu.registers[0xB] = 21;
        cpu.execute(0x7B00 + 123);
        assert.equal(cpu.VB, 144);
    });

    it ('should add 129 to V7, with initial value of 128', () => {
        cpu.registers[0x8] = 129;
        cpu.execute(0x7800 + 128);
        assert.equal(cpu.V8, 1);
    });

    it ('should add 123 to V7, with initial value of 200', () => {
        cpu.registers[0x7] = 200;
        cpu.execute(0x7700 + 123);
        assert.equal(cpu.V7, 67);
    });

    it ('should increment the PC register', () => {
        cpu.PC = 16;
        cpu.execute(0x7AFF);
        assert.equal(cpu.PC, 18);
    });
});
