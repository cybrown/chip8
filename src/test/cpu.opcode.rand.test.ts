import * as assert from 'assert';
import {CPU, ICpuRandomGenerator} from '../main/cpu';

describe ('CPU Opcode RAND (0xCXNN)', () => {

    let cpu: CPU;
    let random: ICpuRandomGenerator;

    beforeEach(() => {
        random = {
            random: () => 1
        };
        cpu = new CPU(null, null, random);
    });

    it ('should set V5 with a random value', () => {
        random.random = () => 0x13;
        cpu.execute(0xC5FF);
        assert.equal(cpu.V5, 0x13);
    });

    it ('should set VA with a random value and mask', () => {
        random.random = () => 0b11110000;
        cpu.execute(0xCA00 + 0b10101010);
        assert.equal(cpu.VA, 0b10100000);
    });
});
