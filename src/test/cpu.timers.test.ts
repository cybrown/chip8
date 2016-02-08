import {CPU} from '../main/cpu';
import * as assert from 'assert';

describe ('CPU timers', () => {

    let cpu: CPU;

    beforeEach(() => {
        cpu = new CPU(null, null, null);
    });

    it ('decrement DT after 500ms by 30', done => {
        cpu.DT = 120;
        setTimeout(() => {
            try {
                assert.ok((cpu.DT - 90) < 6);
                done();
            } catch (e) {
                done(e);
            }
        }, 500);
    });

    it ('decrement ST after 500ms by 30', done => {
        cpu.ST = 120;
        setTimeout(() => {
            try {
                assert.ok((cpu.ST - 90) < 6);
                done();
            } catch (e) {
                done(e);
            }
        }, 500);
    });

    it ('should leave DT and ST at 0', done => {
        cpu.ST = 20;
        setTimeout(() => {
            try {
                assert.equal(cpu.ST, 0);
                assert.equal(cpu.DT, 0);
                done();
            } catch (e) {
                done(e);
            }
        }, 500);
    });
});
