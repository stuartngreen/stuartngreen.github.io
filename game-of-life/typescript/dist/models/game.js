"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
class Game {
    constructor(height, width, speed = 50, currentIteration = 0, maxIterations = Infinity) {
        this.speed = speed;
        this.currentIteration = currentIteration;
        this.maxIterations = maxIterations;
        this.grid = new grid_1.Grid(height, width);
        this.nextGrid = new grid_1.Grid(height, width);
    }
    liveNeighbours(cell) {
        let liveCount = 0;
        for (let r = cell.r - 1; r <= cell.r + 1; r++) {
            for (let c = cell.c - 1; c <= cell.c + 1; c++) {
                let neighbour = this.grid.getCell(r, c);
                if (neighbour && neighbour.isAlive) {
                    liveCount++;
                }
            }
        }
        return cell.isAlive ? liveCount - 1 : liveCount;
    }
    switchGrid() {
        let temp = this.grid;
        this.grid = this.nextGrid;
        this.nextGrid = temp;
    }
    nextIteration() {
        for (let r = 0; r < this.grid.height; r++) {
            for (let c = 0; c < this.grid.width; c++) {
                let currentCell = this.grid.getCell(r, c);
                let processCell = this.nextGrid.getCell(r, c);
                let liveNeighbours = this.liveNeighbours(currentCell);
                if (currentCell.isAlive) {
                    processCell.isAlive = liveNeighbours === 2 || liveNeighbours === 3;
                }
                else {
                    processCell.isAlive = liveNeighbours === 3;
                }
            }
        }
        this.switchGrid();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map