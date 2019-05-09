"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("./grid");
var Game = (function () {
    function Game(height, width, speed, currentIteration, maxIterations) {
        if (speed === void 0) { speed = 50; }
        if (currentIteration === void 0) { currentIteration = 0; }
        if (maxIterations === void 0) { maxIterations = Infinity; }
        this.speed = speed;
        this.currentIteration = currentIteration;
        this.maxIterations = maxIterations;
        this.grid = new grid_1.Grid(height, width);
        this.nextGrid = new grid_1.Grid(height, width);
    }
    Game.prototype.liveNeighbours = function (cell) {
        var liveCount = 0;
        for (var r = cell.r - 1; r <= cell.r + 1; r++) {
            for (var c = cell.c - 1; c <= cell.c + 1; c++) {
                var neighbour = this.grid.getCell(r, c);
                if (neighbour && neighbour.isAlive) {
                    liveCount++;
                }
            }
        }
        return cell.isAlive ? liveCount - 1 : liveCount;
    };
    Game.prototype.switchGrid = function () {
        var temp = this.grid;
        this.grid = this.nextGrid;
        this.nextGrid = temp;
    };
    Game.prototype.nextIteration = function () {
        for (var r = 0; r < this.grid.height; r++) {
            for (var c = 0; c < this.grid.width; c++) {
                var currentCell = this.grid.getCell(r, c);
                var processCell = this.nextGrid.getCell(r, c);
                var liveNeighbours = this.liveNeighbours(currentCell);
                if (currentCell.isAlive) {
                    processCell.isAlive = liveNeighbours === 2 || liveNeighbours === 3;
                }
                else {
                    processCell.isAlive = liveNeighbours === 3;
                }
            }
        }
        this.switchGrid();
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map