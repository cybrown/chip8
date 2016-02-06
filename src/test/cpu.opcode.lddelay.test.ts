import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode LDDELAY (0xFX15)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null, null, null);
    });

    it ('should load V2 to delay timer', () => {
        cpu.registers[2] = 0xFA;
        cpu.execute(0xF215);
        assert.equal(cpu.DT, 0xFA);
    });

    it ('should load VD to delay timer', () => {
        cpu.registers[0xD] = 0xDE;
        cpu.execute(0xFD15);
        assert.equal(cpu.DT, 0xDE);
    });
});
