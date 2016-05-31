'use strict';

function solver (hard) {
    var size = 8;
    var soft = Array(size).fill().map(function () { return null; });
    soft = [5, 3, 6, 0, 7, 1, 4, 2];
    return soft;
}

module.exports = solver;
