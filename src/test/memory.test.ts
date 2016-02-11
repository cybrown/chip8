import * as assert from 'assert';
import {Memory} from '../main/memory';

describe ('Memory', () => {

    let buffer: Uint8Array;
    let memory: Memory;

    beforeEach(() => buffer = new Uint8Array(4096));
    beforeEach(() => memory = new Memory(buffer));

    describe ('Initial state', () => {

        it ('the 80 first values should not be empty (0-9A-F digits)', () => {
            for (let i = 0; i < 80; i++) {
                assert.notEqual(0, memory.readByte(i));
            }
        });

        it ('the others should be filled with zeroes', () => {
            for (let i = 80; i <= 0xFFF; i++) {
                assert.equal(0, memory.readByte(i));
            }
        });
    });

    describe ('Read bytes', () => {

        it ('should read 56 from 0x0', () => {
            buffer[0] = 56;
            const result = memory.readByte(0);
            assert.equal(result, 56);
        });

        it ('should read 0xBE from 0x123', () => {
            buffer[0x123] = 0xBE;
            const result = memory.readByte(0x123);
            assert.equal(result, 0xBE);
        });

        it ('should throw when address > 0xFFF', () => {
            assert.throws(() => memory.readByte(0x1000));
        });

        it ('should throw when address < 0', () => {
            assert.throws(() => memory.readByte(-1));
        });
    });

    describe ('Write bytes', () => {

        it ('should write 0xAF in 0xCAF', () => {
            memory.writeByte(0xCAF, 0xAF);
            assert.equal(buffer[0xCAF], 0xAF);
        });

        it ('should write 0x1B in 0xDEA', () => {
            memory.writeByte(0xDEA, 0x1B);
            assert.equal(buffer[0xDEA], 0x1B);
        });

        it ('should throw if byte is > 255', () => {
            assert.throws(() => memory.writeByte(1, 256));
        });

        it ('should throw if byte is < 0', () => {
            assert.throws(() => memory.writeByte(1, -1));
        });

        it ('should throw when address > 0xFFF', () => {
            assert.throws(() => memory.writeByte(0x1000, 0));
        });

        it ('should throw when address < 0', () => {
            assert.throws(() => memory.writeByte(-1, 0));
        });
    });

    describe ('Read opcode', () => {

        it ('should read an opcode', () => {
            buffer[12] = 0xBE;
            buffer[13] = 0x77;
            const opcode = memory.readOpcode(12);
            assert.equal(opcode, 0xBE77);
        });

        it ('should throw when address > 0xFFE', () => {
            assert.throws(() => memory.readOpcode(0xFFF));
        });

        it ('should throw when address < 0', () => {
            assert.throws(() => memory.readOpcode(-1));
        });
    });

    describe ('Read screen memory zone', () => {

        it ('should return the correct buffer', () => {
            memory.writeByte(0xF00, 0b01010101);
            memory.writeByte(0xFFF, 0b11000011);

            const screenMemory = memory.readScreenZone();

            assert.equal(screenMemory.length, 256);
            assert.equal(screenMemory[0], 0b01010101);
            assert.equal(screenMemory[screenMemory.length - 1], 0b11000011);
        });
    });
});
