export class CPU {

    registers: number[] = new Array(16).fill(0);
    I = 0;

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
        const firstRegisterIndex = ((opcode & 0x0F00) >> 8);
        const constValue = opcode & 0xFF;
        switch (((opcode & 0xF000) >> 12)) {
            case 0x6:
                this.registers[firstRegisterIndex] = constValue;
                break;
            case 0x7:
                this.add(firstRegisterIndex, constValue);
                break;
        }
        return this;
    }

    private add(register: number, value: number): void {
        const sum = this.registers[register] + value;
        this.registers[register] = sum & 0xFF;
    }
}
