import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode JUMPV0 (0xBNNN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('should jump to 0x432 with V0 = 0x42', () => {
        cpu.registers[0] = 0x42;
        cpu.execute(0xB432);
        assert.equal(cpu.PC, 0x474);
    });
});
