import {
    nibble0,
    nibble1,
    nibble2,
    nibble3,
    byte0
} from './byte-util';
import {Stack} from './stack';
import {Memory} from './memory';

export interface ICpuRandomGenerator {
    random(): number;
}

export class CpuRandomGenerator implements ICpuRandomGenerator {

    random() {
        return (Math.random() * 256) | 0;
    }
}

export class CPU {

    registers: number[] = new Array(16).fill(0);

    /**
     * Address register
     * Used to address memory for sprites
     */
    I = 0;

    /**
     * Program counter
     * Current address in memory to execute
     */
    PC = 0;

    /**
     * Sound timer
     */
    ST = 0;

    /**
     * Delay timer
     */
    DT = 0;

    get V0() { return this.registers[0x0]; }
    get V1() { return this.registers[0x1]; }
    get V2() { return this.registers[0x2]; }
    get V3() { return this.registers[0x3]; }
    get V4() { return this.registers[0x4]; }
    get V5() { return this.registers[0x5]; }
    get V6() { return this.registers[0x6]; }
    get V7() { return this.registers[0x7]; }
    get V8() { return this.registers[0x8]; }
    get V9() { return this.registers[0x9]; }
    get VA() { return this.registers[0xA]; }
    get VB() { return this.registers[0xB]; }
    get VC() { return this.registers[0xC]; }
    get VD() { return this.registers[0xD]; }
    get VE() { return this.registers[0xE]; }
    get VF() { return this.registers[0xF]; }

    constructor (private stack: Stack,
                 private memory: Memory,
                 private random: ICpuRandomGenerator) {
        setInterval(() => {
            if (this.DT) this.DT--;
            if (this.ST) this.ST--;
        }, 1000 / 60);
    }

    run(cycles: number): void {
        for (let i = 0; i < cycles; i++) {
            this.execute(this.memory.readOpcode(this.PC));
        }
    }

    execute(opcode: number): CPU {
        this.PC += 2;
        switch (nibble3(opcode)) {
            case 0x0:
                switch (byte0(opcode)) {
                    case 0xE0:  // 0x00E0 => Clear the screen
                        this.clearScreen();
                        break;
                    case 0xEE:  // 0x00EE => Return from subroutine
                        this.ret();
                        break;
                    default:
                        this.invalidOpcode(opcode);
                        break;
                }
                break
            case 0x1:   // 0x1NNN => Jump to address NNN
                this.jump(opcode & 0x0FFF);
                break;
            case 0x2:   // 0x2NNN => Call subroutine at NNN
                this.call(opcode & 0x0FFF);
                break;
            case 0x3:   // 0x3XNN => Skip if VX = NN
                this.skipIfEqualConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x4:   // 0x4XNN => Skip if VX != NN
                this.skipIfNotEqualConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x5:   // 0x5XY0 => Skip if VX = VY
                if (nibble0(opcode) !== 0) {
                    this.invalidOpcode(opcode);
                }
                this.skipIfEqualRegister(nibble2(opcode), nibble1(opcode));
                break;
            case 0x6:   // 0x6XNN => Load NN in VX
                this.loadConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x7:   // 0x7XNN => Add NN to VX
                this.add(nibble2(opcode), byte0(opcode));
                break;
            case 0x8:
                this.operation(nibble0(opcode), nibble2(opcode), nibble1(opcode));
                break;
            case 0x9:   // 0x9XY0 => Skip if VX != VY
                if (nibble0(opcode) !== 0) {
                    this.invalidOpcode(opcode);
                }
                this.skipIfNotEqualRegister(nibble2(opcode), nibble1(opcode));
                break;
            case 0xA:   // 0xANNN => Load NNN in I
                this.loadI(opcode & 0x0FFF);
                break;
            case 0xB:   // 0xBNNN => Jump to adress NNN + V0
                this.jumpV0(opcode & 0x0FFF);
                break;
            case 0xC:   // 0xCXNN => Load random and NN to VX
                this.rand(nibble2(opcode), byte0(opcode));
                break;
            case 0xD:   // 0xDXYN => Draw a sprite at X, Y
                this.draw(nibble2(opcode), nibble1(opcode), nibble0(opcode));
                break;
            case 0xF:   // 0xFXOO => Do operation OO
                const operation = byte0(opcode);
                switch (operation) {
                    case 0x07:  // 0xFX07 => Read DT to VX
                        this.getDelayTimer(nibble2(opcode));
                        break;
                    case 0x15:  // 0xFX15 => Load VX to DT
                        this.setDelayTimer(nibble2(opcode));
                        break;
                    case 0x18:  // 0xFX18 => Load VX to ST
                        this.setSoundTimer(nibble2(opcode));
                        break;
                    case 0x33:  // 0xFX33 => Write BCD of VX at I
                        this.writeBCD(nibble2(opcode));
                        break;
                    case 0x1E:  // 0xFX1E => Add VX to I
                        this.addRegisterToI(nibble2(opcode));
                        break;
                    case 0x55:  // 0xFX55 => Write V0 to VX from I
                        this.writeToMemory(nibble2(opcode));
                        break;
                    case 0x65:  // 0xFX65 => Read from memory at I to V0 to VX
                        this.readFromMemory(nibble2(opcode));
                        break;
                }
                break;
            default:
                this.invalidOpcode(opcode);
                break;
        }
        return this;
    }

    private writeBCD(register: number): void {
        const strValue = (this.registers[register] + 1000).toString().slice(1);
        for (let i = 0; i <= 2; i++) {
            this.memory.writeByte(this.I + i, +strValue[i]);
        }
    }

    private operation(operationType: number, registerX: number, registerY: number): void {
        switch (operationType) {
            case 0x0:   // Set VX = VY
                this.registers[registerX] = this.registers[registerY];
                break;
            case 0x1:   // Set VX = VX | VY
                this.registers[registerX] |= this.registers[registerY];
                break;
            case 0x2:   // Set VX = VX & VY
                this.registers[registerX] &= this.registers[registerY];
                break;
            case 0x3:   // Set VX = VX ^ VY
                this.registers[registerX] ^= this.registers[registerY];
                break;
            case 0x4:   // Set VX = VX + VY, set carry to VF
                const sum = this.registers[registerX] + this.registers[registerY];
                this.registers[0xF] = sum & ~0xFF ? 1 : 0;
                this.registers[registerX] = sum & 0xFF;
                break;
            case 0x5:   // Set VX = VX - VY, set borrow to VF
                const sub = this.registers[registerX] - this.registers[registerY];
                this.registers[0xF] = this.registers[registerX] > this.registers[registerY] ? 1 : 0;
                this.registers[registerX] = sub & 0xFF;
                break;
            case 0x6:   // Set VF = leastSignificantBit(VX), VX = VX >> 1
                this.registers[0xF] = this.registers[registerX] & 1;
                this.registers[registerX] = this.registers[registerX] >> 1;
                break;
            case 0x7:   // Set VX = VY - VX, set no borrow to VF
                const invsub = this.registers[registerY] - this.registers[registerX];
                this.registers[0xF] = this.registers[registerY] > this.registers[registerX] ? 1 : 0;
                this.registers[registerX] = invsub & 0xFF;
                break;
            case 0xE:   // Set VF = mostSignificantBit(VX), VX = VX << 1
                this.registers[0xF] = this.registers[registerX] & 0b10000000 ? 1 : 0;
                this.registers[registerX] = (this.registers[registerX] << 1) & 0xFF;
                break;
            default:
                this.invalidOpcode(0x8000 | (registerX << 8) | (registerY << 4) | operationType);
                break;
        }
    }

    private draw(x: number, y: number, lines: number): void {
        this.registers[0xF] = 0;
        for (let i = 0; i < lines; i++) {
            const byteToDraw = (x / 8)|0 + (y + i) * 8;
            const byteOffset = x % 8;
            const firstByteToDraw = this.memory.readByte(this.I + i) >> byteOffset;
            const secondByteToDraw = (this.memory.readByte(this.I + i) << (8 - byteOffset)) & 0xFF;
            const firstByteToDrawAddress = 0xF00 + byteToDraw;
            const secondByteToDrawAddress = 0xF00 + byteToDraw + 1;
            const originalFirstByte = this.memory.readByte(firstByteToDrawAddress);
            const originalSecondByte = this.memory.readByte(secondByteToDrawAddress);
            if ((originalFirstByte & firstByteToDraw) || (originalSecondByte & secondByteToDraw)) {
                this.registers[0xF] = 1;
            }
            this.memory.writeByte(firstByteToDrawAddress, originalFirstByte ^ firstByteToDraw);
            this.memory.writeByte(secondByteToDrawAddress, originalSecondByte ^ secondByteToDraw);
        }
    }

    private ret(): void {
        this.PC = this.stack.pop();
    }

    private call(address: number): void {
        this.stack.push(this.PC);
        this.PC = address;
    }

    private clearScreen(): void {
        for (let i = 0xF00; i <= 0xFFF; i++) {
            this.memory.writeByte(i, 0);
        }
    }

    private readFromMemory(maxRegister: number): void {
        for (let i = 0; i <= maxRegister; i++) {
            this.registers[i] = this.memory.readByte(this.I + i);
        }
    }

    private writeToMemory(maxRegister: number): void {
        for (let i = 0; i <= maxRegister; i++) {
            this.memory.writeByte(this.I + i, this.registers[i]);
        }
    }

    private invalidOpcode(opcode: number): void {
        throw new Error('Invalid opcode: ' + opcode.toString(16));
    }

    private skipIfEqualConstant(register: number, value: number): void {
        if (this.registers[register] === value) {
            this.PC += 2;
        }
    }

    private skipIfNotEqualConstant(register: number, value: number): void {
        if (this.registers[register] !== value) {
            this.PC += 2;
        }
    }

    private skipIfEqualRegister(registerX: number, registerY: number): void {
        if (this.registers[registerX] === this.registers[registerY]) {
            this.PC += 2;
        }
    }

    private skipIfNotEqualRegister(registerX: number, registerY: number): void {
        if (this.registers[registerX] !== this.registers[registerY]) {
            this.PC += 2;
        }
    }

    private jump(address: number): void {
        this.PC = address;
    }

    private loadConstant(register: number, value: number): void {
        this.registers[register] = value;
    }

    private loadI(value: number): void {
        this.I = value;
    }

    private add(register: number, value: number): void {
        this.registers[register] = byte0(this.registers[register] + value);
    }

    private jumpV0(baseAddress: number): void {
        this.PC = baseAddress + this.V0;
    }

    private addRegisterToI(register: number): void {
        const sum = this.I + this.registers[register];
        this.registers[0xF] = sum & ~0xFFF ? 1 : 0;
        this.I = sum & 0xFFF;
    }

    private setSoundTimer(register: number): void {
        this.ST = this.registers[register];
    }

    private setDelayTimer(register: number): void {
        this.DT = this.registers[register];
    }

    private getDelayTimer(register: number): void {
        this.registers[register] = this.DT;
    }

    private rand(register: number, mask: number): void {
        this.registers[register] = this.random.random() & mask;
    }
}
