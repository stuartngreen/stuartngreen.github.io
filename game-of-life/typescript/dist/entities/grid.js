"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = require("./cell");
class Grid {
    constructor(height = 25, width = 25) {
        this.height = height;
        this.width = width;
        this.grid = [];
        this.createGrid();
    }
    createGrid() {
        for (let r = 0; r < this.height; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c] = new cell_1.Cell(r, c);
            }
        }
    }
    randomise() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.grid[r][c].isAlive = Math.random() >= 0.5;
            }
        }
    }
    getCell(r, c) {
        if ((r > -1 && r < this.height) && (c > -1 && c < this.width)) {
            return this.grid[r][c];
        }
        return null;
    }
    getLiveCount(cell) {
        let liveCount = 0;
        for (let r = cell.r - 1; r <= cell.r + 1; r++) {
            for (let c = cell.c - 1; c <= cell.c + 1; c++) {
                if (this.getCell(r, c) && this.getCell(r, c).isAlive) {
                    liveCount++;
                }
            }
        }
        return cell.isAlive ? liveCount - 1 : liveCount;
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map