import * as assert from 'assert';
import {CPU} from '../main/cpu';
import {Memory} from '../main/memory';

describe ('CPU Opcode memory address of the sprite data (0xFX29)', () => {

    let cpu: CPU;
    let memory: Memory;

    beforeEach(() => {
        const buffer = new Uint8Array(0x1000);
        memory = new Memory(buffer);
        cpu = new CPU(null, memory, null);
    });

    it ('0xF029 should set I to memory address of the digit stored in V0', () => {
        cpu.registers[0x0] = 0xF;
        cpu.execute(0xF029);
        assert.equal(cpu.I, 75); // in memory sprite data for digit F start at address 75
    });
    
    it ('0xF529 should set I to memory address of the digit stored in V5', () => {
        cpu.registers[0x5] = 0x9;
        cpu.execute(0xF529);
        assert.equal(cpu.I, 45); // in memory sprite data for digit 9 start at address 45
    });
    
    it ('0xFA29 should set I to memory address of the digit stored in VA', () => {
        cpu.registers[0xA] = 0x1;
        cpu.execute(0xFA29);
        assert.equal(cpu.I, 5); // in memory sprite data for digit 1 start at address 5
    });
    
    it ('0xFF29 should set I to memory address of the digit stored in VF', () => {
        cpu.registers[0xF] = 0x5;
        cpu.execute(0xFF29);
        assert.equal(cpu.I, 25); // in memory sprite data for digit 5 start at address 25
    });
});
