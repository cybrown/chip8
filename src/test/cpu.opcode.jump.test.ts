import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode JUMP (0x1NNN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('should jump to 0x432', () => {
        cpu.execute(0x1432);
        assert.equal(cpu.PC, 0x432);
    });
});
