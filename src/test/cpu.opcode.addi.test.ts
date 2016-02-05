import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode ADDI (0xFX1E)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('should add V5 to I when I = 0 and V5 = 0xFE', () => {
        cpu.I = 0;
        cpu.registers[5] = 0xFE;
        cpu.execute(0xF51E);
        assert.equal(cpu.I, 0xFE);
    });

    it ('should add VF to I when I = 0xFFF and VF = 0x02', () => {
        cpu.I = 0xFFF;
        cpu.registers[0xF] = 2;
        cpu.execute(0xFF1E);
        assert.equal(cpu.I, 1);
    });
});
