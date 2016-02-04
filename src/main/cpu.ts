import {
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
        switch (nibble3(opcode)) {
            case 0x1:   // 0x1NNN => Jump to address NNN
                this.jump(opcode & 0x0FFF);
                return;
            case 0x6:   // 0x6XNN => Load NN in VX
                this.loadConstant(nibble2(opcode), byte0(opcode));
                break;
            case 0x7:   // 0x7XNN => Add NN to VX
                this.add(nibble2(opcode), byte0(opcode));
                break;
            case 0xB:   // 0xBNNN => Jump to adress NNN + V0
                this.jumpV0(opcode & 0x0FFF);
                return;
        }
        this.PC += 2;
        return this;
    }

    private jump(address: number): void {
        this.PC = address;
    }

    private loadConstant(register: number, value: number): void {
        this.registers[register] = value;
    }

    private add(register: number, value: number): void {
        this.registers[register] = byte0(this.registers[register] + value);
    }

    private jumpV0(baseAddress: number): void {
        this.PC = baseAddress + this.V0;
    }
}
