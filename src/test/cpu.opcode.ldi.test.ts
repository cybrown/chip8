import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode LDI (0xANNN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null, null, null);
    });

    it ('should load the value 0x3BC in the I register', () => {
        cpu.execute(0xA3BC);
        assert.equal(cpu.I, 0x3BC);
    });
});
