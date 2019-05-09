"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell = (function () {
    function Cell(r, c, isAlive) {
        if (isAlive === void 0) { isAlive = false; }
        this.r = r;
        this.c = c;
        this.isAlive = isAlive;
    }
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map