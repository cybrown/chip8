export class Memory {

    constructor (private buffer: Uint8Array) {

    }

    readByte(address: number): number {
        this.checkAddress(address);
        return this.buffer[address];
    }

    writeByte(address: number, value: number): void {
        this.checkAddress(address);
        if (value > 255 || value < 0) {
            throw new Error('Byte out of bound: ' + value);
        }
        this.buffer[address] = value;
    }

    readOpcode(address: number): number {
        this.checkAddress(address, 0xFFE);
        return this.buffer[address] << 8 | this.buffer[address + 1];
    }

    private checkAddress(address: number, maxAddress?: number): void {
        maxAddress = maxAddress || 0xFFF;
        if (address < 0 || address > maxAddress) {
            throw new Error('Address out of bound: ' + address);
        }
    }
}
