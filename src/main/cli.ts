import {CPU, ICpuRandomGenerator} from './cpu';
import {Stack} from './stack';
import {Memory} from './memory';
import * as fs from 'fs';
import {CliScreen} from './cli-screen';

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

const buffer = new Uint8Array(0xFFF);
const memory = new Memory(buffer);

function cpuFactory(buffer: Uint8Array): CPU {
    const stack = new Stack();
    return new CustomCPU(stack, memory, null);
}

var ctx = require('axel');

const cliScreen = new CliScreen({
    point(x, y) {
        ctx.point(x + 1, y + 1);
    }
});

fs.readFile(process.argv[2], (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length || i <= 0xFFF; i++) {
        buffer[i] = data[i];
    }
    const cpu = cpuFactory(buffer);
    setInterval(() => {
        cpu.run(1);
        ctx.bg(0, 255, 0);
        cliScreen.drawScreen(memory.readScreenZone());
        ctx.bg(0, 0, 0);
    }, 100);
});
