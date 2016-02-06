import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Memory} from '../main/memory';

describe ('CPU Opcode CLS (0x00E0)', () => {

    let memory: Memory;
    let cpu: CPU;

    beforeEach(() => {
        const buffer = new Uint8Array(0x1000);
        memory = new Memory(buffer);
        cpu = new CPU(null, memory, null);
    });

    it ('should erase memory from 0xFF0 to 0xFFF', () => {
        memory.writeByte(0xF00, 1);
        memory.writeByte(0xFFF, 1);

        cpu.execute(0x00E0);

        assert.equal(memory.readByte(0xF00), 0);
        assert.equal(memory.readByte(0xFFF), 0);
    });
});
