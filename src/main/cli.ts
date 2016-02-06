import {CPU, ICpuRandomGenerator} from './cpu';
import {Stack} from './stack';
import {Memory} from './memory';
import * as fs from 'fs';

function range(min: number, max: number): number[] {
    const result: number[] = [];
    for (let i = min; i < max; i++) {
        result.push(i);
    }
    return result;
}

class CustomCPU extends CPU {

    constructor(stack: Stack, memory: Memory, random: ICpuRandomGenerator) {
        super(stack, memory, random);
    }

    execute(opcode: number): this {
        console.log(`PC: ${this.PC.toString(16)}, opcode: 0x${opcode.toString(16)}, ST: 0x${this.ST.toString(16)}, DT: 0x${this.DT.toString(16)}, I: 0x${this.I.toString(16)}`);
        console.log(range(0, 8).map(i => `V${i}: 0x${this.registers[i].toString(16)}`).join(', '));
        console.log(range(8, 16).map(i => `V${i}: 0x${this.registers[i].toString(16)}`).join(', '));
        console.log('');
        super.execute(opcode);
        return this;
    }
}

function cpuFactory(buffer: Uint8Array): CPU {
    const memory = new Memory(buffer);
    const stack = new Stack();
    return new CustomCPU(stack, memory, null);
}

fs.readFile(process.argv[2], (err, data) => {
    if (err) throw err;
    const buffer = new Uint8Array(0xFFF);
    for (let i = 0; i < data.length || i <= 0xFFF; i++) {
        buffer[i] = data[i];
    }
    const cpu = cpuFactory(buffer);
    cpu.run(1000);
});
