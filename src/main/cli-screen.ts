export interface IScreenDrawer {
    point(x: number, y: number): void;
}

export class CliScreen {

    constructor (private drawer: IScreenDrawer) {

    }

    drawByte(byte: number, col: number, row: number): void {
        for (var i = 0; i < 8; i++) {
            if (byte & (1 << (7 - i))) {
                this.drawer.point(i + col * 8, row);
            }
        }
    }

    drawRow(buffer: Uint8Array, row: number): void {
        for (let i = 0; i < 8; i++) {
            this.drawByte(buffer[i], i, row);
        }
    }

    drawScreen(buffer: Uint8Array): void {
        for (let i = 0; i < 32; i++) {
            this.drawRow(buffer.slice(i * 8, i * 8 + 8), i);
        }
    }
}
