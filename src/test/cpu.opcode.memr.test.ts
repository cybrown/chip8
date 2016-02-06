import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Memory} from '../main/memory';

describe ('CPU Opcode MEMR (0xFX65)', () => {

    let cpu: CPU;
    let memory: Memory;

    beforeEach(() => {
        const buffer = new Uint8Array(0x1000);
        memory = new Memory(buffer);
        cpu = new CPU(null, memory, null);
    });

    it ('should read memory at 0x000 to V0', () => {
        memory.writeByte(0, 0x13);
        cpu.execute(0xF065);
        assert.equal(cpu.V0, 0x13);
    });

    it ('should read memory at 0xAE0 to V0, V1, V2 and V3', () => {
        cpu.I = 0xAE0;
        memory.writeByte(0xAE0 + 0, 0x13);
        memory.writeByte(0xAE0 + 1, 0x42);
        memory.writeByte(0xAE0 + 2, 0x51);
        memory.writeByte(0xAE0 + 3, 0x59);

        cpu.execute(0xF365);

        assert.equal(cpu.V0, 0x13);
        assert.equal(cpu.V1, 0x42);
        assert.equal(cpu.V2, 0x51);
        assert.equal(cpu.V3, 0x59);
    });
});
