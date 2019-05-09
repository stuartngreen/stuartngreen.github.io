"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cell_1 = require("../entities/cell");
var Grid = (function () {
    function Grid(height, width) {
        this.height = height;
        this.width = width;
        this.grid = [];
        this.createGrid();
    }
    Grid.prototype.createGrid = function () {
        for (var r = 0; r < this.height; r++) {
            this.grid[r] = [];
            for (var c = 0; c < this.width; c++) {
                this.grid[r][c] = new cell_1.Cell(r, c, Math.random() >= 0.5);
            }
        }
    };
    Grid.prototype.getCell = function (r, c) {
        if ((r > -1 && r < this.height) &&
            (c > -1 && c < this.width)) {
            return this.grid[r][c];
        }
        return null;
    };
    return Grid;
}());
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map