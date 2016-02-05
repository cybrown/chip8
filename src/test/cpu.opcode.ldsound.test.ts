import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode LDSOUND (0xFX18)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('should load V6 to sound timer', () => {
        cpu.registers[6] = 42;
        cpu.execute(0xF618);
        assert.equal(cpu.ST, 42);
    });

    it ('should load VA to sound timer', () => {
        cpu.registers[0xA] = 0xFF;
        cpu.execute(0xFA18);
        assert.equal(cpu.ST, 0xFF);
    });
});
