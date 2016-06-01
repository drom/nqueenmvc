
function asmFunc(global, env, buffer) {
    'use asm';

    var HEAP32 = new global.Int32Array(buffer);

    // NON-ASM
    var callback;

    function report () {
        var i = 0, res = 0;
        // NON-ASM
        var arr = [];
        for (i = 0; (i | 0) < 32; i = (((i | 0) + 4) | 0)) {
            res = HEAP32[i >> 2];
            // NON-ASM
            arr.push(res);
        }
        // NON-ASM
        callback(arr);
    }

    function rec (y) {
        y = y | 0;
        var x = 0,
            xpy = 0,
            xmy = 0,
            i = 0,
            ylen = 0,
            tmp = 0,
            res = 0;

        LY: for (x = 0; (x | 0) < 8; x = (x + 1) | 0) {
            xpy = (x + y) | 0;
            xmy = (x - y) | 0;
            ylen = (y * 4) | 0;

            for (i = 0; (i | 0) < (ylen | 0); i = (i + 4) | 0) {
                // check x conflicts
                if ((HEAP32[i >> 2]) == (x | 0)) {
                    continue LY;
                }

                // check x + y conflicts
                if ((HEAP32[(32 + i) >> 2]) == xpy) {
                    continue LY;
                }

                // check x - y conflicts
                if ((HEAP32[(64 + i) >> 2]) == xmy) {
                    continue LY;
                }
            }

            HEAP32[i >> 2] = x;
            HEAP32[(32 + i) >> 2] = xpy;
            HEAP32[(64 + i) >> 2] = xmy;

            if (y == 7) {
                report();
            } else {
                rec ((y + 1) | 0);
            }

        }
    }

    function solver (cb) {
        // ASM
        // cb = cb >>> 0;
        // NON-ASM
        callback = cb;
        rec(0);
    }

    return { solver: solver };
}

module.exports = asmFunc;
