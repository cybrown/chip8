import {
    nibble0,
    nibble1,
    nibble2,
    nibble3,
    byte0
} from './byte-util';

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

    execute(opcode: number): CPU {
        this.PC += 2;
        switch (nibble3(opcode)) {
            case 0x1:   // 0x1NNN => Jump to address NNN
                this.jump(opcode & 0x0FFF);
                break;
            case 0x3:   // 0x3XNN => Skip if VX = NN
                this.skipIfEqualConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x4:   // 0x4XNN => Skip if VX != NN
                this.skipIfNotEqualConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x5:   // 0x5XY0 => Skip if VX = VY
                if (nibble0(opcode) !== 0) {
                    this.wrongOpcode(opcode);
                }
                this.skipIfEqualRegister(nibble2(opcode), nibble1(opcode));
                break;
            case 0x6:   // 0x6XNN => Load NN in VX
                this.loadConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x7:   // 0x7XNN => Add NN to VX
                this.add(nibble2(opcode), byte0(opcode));
                break;
            case 0x9:   // 0x9XY0 => Skip if VX != VY
                if (nibble0(opcode) !== 0) {
                    this.wrongOpcode(opcode);
                }
                this.skipIfNotEqualRegister(nibble2(opcode), nibble1(opcode));
                break;
            case 0xA:   // 0xANNN => Load NNN in I
                this.loadI(opcode & 0x0FFF);
                break;
            case 0xB:   // 0xBNNN => Jump to adress NNN + V0
                this.jumpV0(opcode & 0x0FFF);
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
                    case 0x1E:  // 0xFX1E => Add VX to I
                        this.addRegisterToI(nibble2(opcode));
                        break;
                }
                break;
        }
        return this;
    }

    private wrongOpcode(opcode: number): void {
        throw new Error('Wrong opcode: ' + opcode.toString(16));
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
}
