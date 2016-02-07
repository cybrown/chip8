import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Memory} from '../main/memory';

describe ('CPU Opcode DRAW (0xDXYN)', () => {

    let buffer: Uint8Array;
    let memory: Memory;
    let cpu: CPU;

    beforeEach(() => {
        buffer = new Uint8Array(0x1000);
        memory = new Memory(buffer);
        cpu = new CPU(null, memory, null);
    });

    it ('should draw a one line sprite at 0, 0', () => {
        buffer[0xAD0] = 0b10101010;
        cpu.I = 0xAD0;

        cpu.execute(0xD001);

        assert.equal(buffer[0xF00], 0b10101010);
        assert.equal(cpu.VF, 0);
    });

    it ('should draw a one line sprite at 2, 0', () => {
        buffer[0xAD0] = 0b10101010;
        cpu.I = 0xAD0;

        cpu.execute(0xD201);

        assert.equal(buffer[0xF00], 0b00101010);
        assert.equal(buffer[0xF01], 0b10000000);
    });

    it ('should draw a one line sprite at 0x0, 0xA', () => {
        buffer[0xAD0] = 0b10101010;
        cpu.I = 0xAD0;

        cpu.execute(0xD0A1);

        assert.equal(buffer[0xF50], 0b10101010);
    });

    it ('should draw a one line sprite at 3x0, 0xA', () => {
        buffer[0xAD0] = 0b10101010;
        cpu.I = 0xAD0;

        cpu.execute(0xD3A1);

        assert.equal(buffer[0xF50], 0b00010101);
        assert.equal(buffer[0xF51], 0b01000000);
    });

    it ('should draw a two lines sprite at 3x0, 0xA', () => {
        buffer[0xAD0] = 0b10101010;
        buffer[0xAD1] = 0b01010101;
        cpu.I = 0xAD0;

        cpu.execute(0xD3A2);

        assert.equal(buffer[0xF50], 0b00010101);
        assert.equal(buffer[0xF51], 0b01000000);
        assert.equal(buffer[0xF58], 0b00001010);
        assert.equal(buffer[0xF59], 0b10100000);
    });

    it ('should draw a two lines sprite at 3x0, 0xA with xor', () => {
        buffer[0xAD0] = 0b10101010;
        buffer[0xAD1] = 0b01010101;
        buffer[0xF58] = 0b00001011;
        cpu.I = 0xAD0;

        cpu.execute(0xD3A2);

        assert.equal(buffer[0xF50], 0b00010101);
        assert.equal(buffer[0xF51], 0b01000000);
        assert.equal(buffer[0xF58], 0b00000001);
        assert.equal(buffer[0xF59], 0b10100000);
    });

    it ('should draw a one line sprite at 0, 0, set VF to 0', () => {
        buffer[0xAD0] = 0b10101010;
        cpu.I = 0xAD0;

        cpu.execute(0xD001);

        assert.equal(cpu.VF, 0);
    });

    it ('should draw a one line sprite at 0, 0, set VF to 1', () => {
        buffer[0xAD0] = 0b10101010;
        buffer[0xF00] = 0b11111111;
        cpu.I = 0xAD0;

        cpu.execute(0xD001);

        assert.equal(cpu.VF, 1);
    });
});
