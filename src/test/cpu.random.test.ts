import * as assert from 'assert';
import {CpuRandomGenerator} from '../main/cpu';

describe ('CPU random generator', () => {

    let cpuRandomGenerator: CpuRandomGenerator;

    beforeEach(() => cpuRandomGenerator = new CpuRandomGenerator());

    it ('should always be between 0 and 255, included', () => {
        for (var i = 0; i < 1000; i++) {
            var random = cpuRandomGenerator.random();
            if (random < 0 || random > 255) {
                throw new Error(random + " is not a valid random value");
            }
        }
    });
});
