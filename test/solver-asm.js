'use strict';

var solverAsm = require('../lib/solver-asm');

describe('solverAsm', function () {
    it('8x8', function (done) {
        var buffer = new ArrayBuffer(4096);
        var stdlib = {
            Uint8Array: Uint8Array,
            Uint32Array: Uint32Array,
            Int32Array: Int32Array
        };
        solverAsm(stdlib, null, buffer).solver(console.log);
        done();
    });
});
