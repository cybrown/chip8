import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Opcode arithmetic and logic operations (0x8XYN)', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null, null, null);
    });

    describe ('Opcode 0x8XY0 VX = VY', () => {

        it ('should set VX to VY', () => {
            cpu.registers[0x5] = 0x42;
            cpu.execute(0x8150);
            assert.equal(cpu.V1, 0x42);
        });
    });

    describe ('Opcode 0x8XY1 VX = VX or VY', () => {

        it ('should set VA = VA or VC', () => {
            cpu.registers[0xA] = 3;
            cpu.registers[0xC] = 5;
            cpu.execute(0x8AC1);
            assert.equal(cpu.VA, 7);
        });
    });

    describe ('Opcode 0x8XY2 VX = VX and VY', () => {

        it ('should set VD = VD and V4', () => {
            cpu.registers[0xD] = 6;
            cpu.registers[0x4] = 3;
            cpu.execute(0x8D42);
            assert.equal(cpu.VD, 2);
        });
    });

    describe ('Opcode 0x8XY3 VX = VX xor VY', () => {

        it ('should set VB = VB xor V3', () => {
            cpu.registers[0xB] = 6;
            cpu.registers[0x3] = 3;
            cpu.execute(0x8B33);
            assert.equal(cpu.VB, 5);
        });
    });

    describe ('Opcode 0x8XY4 VX = VX + VY, with carry to VF', () => {

        it ('should add V3 in V6, no overflow', () => {
            cpu.registers[0xF] = 7; // 7 is a random value other than 0
            cpu.registers[0xA] = 100;
            cpu.registers[0xC] = 125;
            cpu.execute(0x8AC4);
            assert.equal(cpu.VA, 225);
            assert.equal(cpu.VF, 0);
        });

        it ('should add V3 in V6, with overflow', () => {
            cpu.registers[0xF] = 7; // 7 is a random value other than 0
            cpu.registers[0xA] = 255;
            cpu.registers[0xC] = 3;
            cpu.execute(0x8AC4);
            assert.equal(cpu.VA, 2);
            assert.equal(cpu.VF, 1);
        });
    });

    describe ('Opcode 0x8XY5 VX = VX - VY, with borrow to VF', () => {

        it ('should substract V8 from V7, no underflow', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x8] = 120;
            cpu.registers[0x7] = 100;
            cpu.execute(0x8875);
            assert.equal(cpu.V8, 20);
            assert.equal(cpu.VF, 1);
        });

        it ('should substract V8 from V7, with underflow', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x8] = 100;
            cpu.registers[0x7] = 120;
            cpu.execute(0x8875);
            assert.equal(cpu.V8, 256 - 20);
            assert.equal(cpu.VF, 0);
        });
    });

    describe ('Opcode 0x8XY6 VF = leastSignificantBit(VX), VX = VX >> 1', () => {

        it ('should right shift V5 and set VF to 0', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x5] = 0b10101010;
            cpu.execute(0x8506);
            assert.equal(cpu.V5, 0b01010101);
            assert.equal(cpu.VF, 0);
        });

        it ('should right shift V3 and set VF to 1', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x3] = 0b01010101;
            cpu.execute(0x8306);
            assert.equal(cpu.V3, 0b00101010);
            assert.equal(cpu.VF, 1);
        });
    });

    describe ('Opcode 0x8XY7 VX = VY - VX, with borrow to VF', () => {

        it ('should substract V7 from V8 and store to V8, no underflow', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x8] = 120;
            cpu.registers[0x7] = 100;
            cpu.execute(0x8877);
            assert.equal(cpu.V8, 256 - 20);
            assert.equal(cpu.VF, 0);
        });

        it ('should substract V7 from V8 and store to V8, with underflow', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x8] = 100;
            cpu.registers[0x7] = 120;
            cpu.execute(0x8877);
            assert.equal(cpu.V8, 20);
            assert.equal(cpu.VF, 1);
        });
    });

    describe ('Opcode 0x8XYE VF = leastSignificantBit(VX), VX = VX << 1', () => {

        it ('should right shift VE and set VF to 0', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0xE] = 0b01010101;
            cpu.execute(0x8E0E);
            assert.equal(cpu.VE, 0b10101010);
            assert.equal(cpu.VF, 0);
        });

        it ('should right shift V3 and set VF to 1', () => {
            cpu.registers[0xF] = 5; // 5 is a random value other than 0
            cpu.registers[0x3] = 0b10101010;
            cpu.execute(0x830E);
            assert.equal(cpu.V3, 0b01010100);
            assert.equal(cpu.VF, 1);
        });
    });
});
