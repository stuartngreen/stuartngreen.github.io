"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = require("../entities/cell");
class Grid {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.grid = [];
        this.createGrid();
    }
    createGrid() {
        for (let r = 0; r < this.height; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c] = new cell_1.Cell(r, c, Math.random() >= 0.5);
            }
        }
    }
    getCell(r, c) {
        if ((r > -1 && r < this.height) &&
            (c > -1 && c < this.width)) {
            return this.grid[r][c];
        }
        return null;
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map