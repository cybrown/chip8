import * as assert from 'assert';
import {CPU} from '../main/cpu';

describe ('CPU Initialisation', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU();
    });

    it ('Valeur de départ des registres généraux', () => {
        assert.equal(cpu.V0, 0);
        assert.equal(cpu.V1, 0);
        assert.equal(cpu.V2, 0);
        assert.equal(cpu.V3, 0);
        assert.equal(cpu.V4, 0);
        assert.equal(cpu.V5, 0);
        assert.equal(cpu.V6, 0);
        assert.equal(cpu.V7, 0);
        assert.equal(cpu.V8, 0);
        assert.equal(cpu.V9, 0);
        assert.equal(cpu.VA, 0);
        assert.equal(cpu.VB, 0);
        assert.equal(cpu.VC, 0);
        assert.equal(cpu.VD, 0);
        assert.equal(cpu.VE, 0);
        assert.equal(cpu.VF, 0);
    });

    it ('Valeur de départ du registre d\'adresse', () => {
        assert.equal(cpu.I, 0);
    });

    it ('Valeur de départ du registre PC', () => {
        assert.equal(cpu.PC, 0);
    });

    it ('Valeur de départ du registre ST (sound timer)', () => {
        assert.equal(cpu.ST, 0);
    });
});
