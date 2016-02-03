import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode SET (0x6XNN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('should set the register V1 with a value', () => {
        cpu.execute(0x6122);
        assert.equal(cpu.V1, 34);
    });

    it ('should set the register VA with a value', () => {
        cpu.execute(0x6AFF);
        assert.equal(cpu.VA, 255);
    });
});
