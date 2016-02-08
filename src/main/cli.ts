import {CPU, ICpuRandomGenerator, CpuRandomGenerator} from './cpu';
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
        //sconsole.log(`PC: ${this.PC.toString(16)}, opcode: 0x${opcode.toString(16)}, ST: 0x${this.ST.toString(16)}, DT: 0x${this.DT.toString(16)}, I: 0x${this.I.toString(16)}`);
        //sconsole.log(range(0, 8).map(i => `V${i}: 0x${this.registers[i].toString(16)}`).join(', '));
        //sconsole.log(range(8, 16).map(i => `V${i}: 0x${this.registers[i].toString(16)}`).join(', '));
        //sconsole.log('');
        super.execute(opcode);
        return this;
    }
}

const buffer = new Uint8Array(0x1000);
const memory = new Memory(buffer);

function cpuFactory(buffer: Uint8Array): CPU {
    const stack = new Stack();
    return new CustomCPU(stack, memory, new CpuRandomGenerator());
}

var ctx = require('axel');

const cliScreen = new CliScreen({
    point(x, y) {
        //console.log(x, y);
        //ctx.point(x + 1, y + 1);
    }
});

//ctx.bg(0, 255, 0);

function hexToBin(hex: string): string {
    switch (hex) {
        case '0': return '    ';
        case '1': return '   O';
        case '2': return '  O ';
        case '3': return '  OO';
        case '4': return ' O  ';
        case '5': return ' O O';
        case '6': return ' OO ';
        case '7': return ' OOO';
        case '8': return 'O   ';
        case '9': return 'O  O';
        case 'a': return 'O O ';
        case 'b': return 'O OO';
        case 'c': return 'OO  ';
        case 'd': return 'OO O';
        case 'e': return 'OOO ';
        case 'f': return 'OOOO';
    }
    return '+';
}

fs.readFile(process.argv[2], (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length || i <= 0xFFF; i++) {
        buffer[i + 0x200] = data[i];
    }
    const cpu = cpuFactory(buffer);
    cpu.PC = 0x200;
    setInterval(() => {
        cpu.run(1);
        //ctx.point(0, 0);
        //ctx.bg(0, 255, 0);
        ctx.point(0, 0);
        const lines = new Buffer(memory.readScreenZone()).toString('hex');
        for (let i = 0; i < 32; i++) {
            console.log(lines.slice(i*16, i*16+16).split('').map(hexToBin).join(''));
        }
        cliScreen.drawScreen(memory.readScreenZone());
        //ctx.bg(0, 0, 0);
    }, 200);
});
