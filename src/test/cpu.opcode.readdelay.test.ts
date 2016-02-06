import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode READDELAY (0xFX07)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null, null, null);
    });

    it ('should load V0 to delay timer', () => {
        cpu.DT = 42;
        cpu.execute(0xF007);
        assert.equal(cpu.V0, 42);
    });

    it ('should load VB to delay timer', () => {
        cpu.DT = 0xFF;
        cpu.execute(0xFB07);
        assert.equal(cpu.VB, 0xFF);
    });
});
