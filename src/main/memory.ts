export class Memory {

    constructor (private buffer: Uint8Array) {
        this.loadDigits();
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

    readScreenZone(): Uint8Array {
        return this.buffer.slice(0xF00, 0x1000);
    }

    private checkAddress(address: number, maxAddress?: number): void {
        maxAddress = maxAddress || 0xFFF;
        if (address < 0 || address > maxAddress) {
            throw new Error('Address out of bound: ' + address);
        }
    }
    
    /**
     * Charge en mémoire la représentation graphique des digits (0-9A-F)
     */
    loadDigits(): void {
        var digits: Array<number> = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];
        
        for(var i = 0; i < digits.length; i++){
            this.buffer[i] = digits[i];
        }
    }
}
