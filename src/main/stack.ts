export class Stack {

    private values: number[] = [];

    get length() {
        return this.values.length;
    }

    push(value: number): void {
        if (this.length === 16) {
            throw new Error('Stack overflow');
        }
        if (value > 0xFFF || value < 0) {
            throw new Error('Value out of bound for stack: ' + value);
        }
        this.values.push(value);
    }

    pop(): number {
        if (this.length === 0) {
            throw new Error('Stack underflow');
        }
        const result = this.values.pop();
        return result;
    }
}
