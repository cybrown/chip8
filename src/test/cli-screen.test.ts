import * as assert from 'assert';
import {CliScreen, IScreenDrawer} from '../main/cli-screen';

describe ('CLI Screen', () => {

    let screenDrawerMock: IScreenDrawer;
    let screen: CliScreen;

    beforeEach(() => {
        screenDrawerMock = <any> {};
        screen = new CliScreen(screenDrawerMock);
    });

    it ('should draw a point at 0, 0 from a byte', () => {
        const points: [number, number][] = [];
        screenDrawerMock.point = (x, y) => {
            points.push([x, y]);
        };

        screen.drawByte(0b10000000, 0, 0);

        assert.deepStrictEqual(points, [[0, 0]]);
    });

    it ('should draw a point at 1, 0 from a byte', () => {
        const points: [number, number][] = [];
        screenDrawerMock.point = (x, y) => {
            points.push([x, y]);
        };

        screen.drawByte(0b01000000, 0, 0);

        assert.deepStrictEqual(points, [[1, 0]]);
    });

    it ('should draw points on a row', () => {
        const points: [number, number][] = [];
        screenDrawerMock.point = (x, y) => {
            points.push([x, y]);
        };
        const buffer = new Uint8Array(8);
        buffer[0] = 0b11001100;
        buffer[1] = 0b00111100;
        buffer[2] = 0b10101010;
        buffer[3] = 0b01010101;
        buffer[4] = 0b11100111;
        buffer[5] = 0b11000011;
        buffer[6] = 0b11110000;
        buffer[7] = 0b00001111;

        screen.drawRow(buffer.slice(), 0);

        assert.deepStrictEqual(points, [
            [0,  0], [1,  0], [4,  0], [5,  0],
            [10, 0], [11, 0], [12, 0], [13, 0],
            [16, 0], [18, 0], [20, 0], [22, 0],
            [25, 0], [27, 0], [29, 0], [31, 0],
            [32, 0], [33, 0], [34, 0], [37, 0], [38, 0], [39, 0],
            [40, 0], [41, 0], [46, 0], [47, 0],
            [48, 0], [49, 0], [50, 0], [51, 0],
            [60, 0], [61, 0], [62, 0], [63, 0]
        ]);
    });

    it ('should draw points on the screen', () => {
        const points: [number, number][] = [];
        screenDrawerMock.point = (x, y) => {
            points.push([x, y]);
        };
        const buffer = new Uint8Array(8 * 32);
        buffer[0] = 0b01000000;
        buffer[1] = 0b00100000;
        buffer[8] = 0b10000000;
        buffer[33] = 0b00000100;

        screen.drawScreen(buffer);

        assert.equal(points.length, 4);
        assert.deepEqual(points[0], [1, 0]);
        assert.deepEqual(points[1], [10, 0]);
        assert.deepEqual(points[2], [0, 1]);
        assert.deepEqual(points[3], [13, 4]);
    });
});
