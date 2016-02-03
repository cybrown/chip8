import * as assert from 'assert';
import * as byteUtil from '../main/byte-util';

describe ('byte-util', () => {

    describe ('nibble0', () => {
        it ('0x4563 => 0x3', () => assert.equal(byteUtil.nibble0(0x4563), 0x3));
        it ('0xDEFA => 0xA', () => assert.equal(byteUtil.nibble0(0x456A), 0xA));
    });

    describe ('nibble1', () => {
        it ('0x4563 => 0x6', () => assert.equal(byteUtil.nibble1(0x4563), 0x6));
        it ('0xDEFA => 0xF', () => assert.equal(byteUtil.nibble1(0xDEFA), 0xF));
    });

    describe ('nibble2', () => {
        it ('0x4563 => 0x5', () => assert.equal(byteUtil.nibble2(0x4563), 0x5));
        it ('0xDEFA => 0xE', () => assert.equal(byteUtil.nibble2(0xDEFA), 0xE));
    });

    describe ('nibble3', () => {
        it ('0x4563 => 0x4', () => assert.equal(byteUtil.nibble3(0x4563), 0x4));
        it ('0xDEFA => 0xD', () => assert.equal(byteUtil.nibble3(0xDEFA), 0xD));
    });

    describe ('byte0', () => {
        it ('0x4563 => 0x4', () => assert.equal(byteUtil.byte0(0x4563), 0x63));
        it ('0xDEFA => 0xD', () => assert.equal(byteUtil.byte0(0xDEFA), 0xFA));
    });

    describe ('byte1', () => {
        it ('0x4563 => 0x4', () => assert.equal(byteUtil.byte1(0x4563), 0x45));
        it ('0xDEFA => 0xD', () => assert.equal(byteUtil.byte1(0xDEFA), 0xDE));
    });
});
