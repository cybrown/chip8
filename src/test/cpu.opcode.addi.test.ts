import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode ADDI (0xFX1E)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null, null, null);
    });

    it ('should add V5 to I when I = 0 and V5 = 0xFE', () => {
        cpu.I = 0;
        cpu.registers[5] = 0xFE;
        cpu.execute(0xF51E);
        assert.equal(cpu.I, 0xFE);
    });

    it ('should set VF to 0 when there is no overflow', () => {
        cpu.I = 0;
        cpu.registers[0xF] = 4;
        cpu.registers[5] = 0xFE;
        cpu.execute(0xF51E);
        assert.equal(cpu.VF, 0);
    });

    it ('should add VE to I when I = 0xFFF and VE = 0x02', () => {
        cpu.I = 0xFFF;
        cpu.registers[0xE] = 2;
        cpu.execute(0xFE1E);
        assert.equal(cpu.I, 1);
    });

    it ('should set VF to 1 on overflow', () => {
        cpu.I = 0xFFF;
        cpu.registers[0x1] = 2;
        cpu.execute(0xF11E);
        assert.equal(cpu.VF, 1);
    });
});
