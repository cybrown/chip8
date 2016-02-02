export class CPU {

    registers: number[] = [];

    get V1() { return this.registers[1]; }
    get VA() { return this.registers[10]; }

    execute(opcode: number): CPU {
        const registerIndex = ((opcode & 0x0F00) >> 8);
        this.registers[registerIndex] = opcode & 0xFF;
        return this;
    }
}
