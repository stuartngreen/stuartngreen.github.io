"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var game_1 = require("../models/game");
describe('Game Tests', function () {
    var game;
    beforeEach(function () {
        game = new game_1.Game(3, 3);
        game.grid.getCell(0, 0).isAlive = false;
        game.grid.getCell(0, 1).isAlive = true;
        game.grid.getCell(0, 2).isAlive = false;
        game.grid.getCell(1, 0).isAlive = true;
        game.grid.getCell(1, 1).isAlive = true;
        game.grid.getCell(1, 2).isAlive = true;
        game.grid.getCell(2, 0).isAlive = false;
        game.grid.getCell(2, 1).isAlive = false;
        game.grid.getCell(2, 2).isAlive = true;
    });
    it('should return correct count of live neighbours when cell is alive', function () {
        var cell = game.grid.getCell(1, 1);
        var liveCount = game.liveNeighbours(cell);
        chai_1.expect(liveCount).to.be.equal(4);
    });
    it('should return correct count of live neighbours when cell is dead', function () {
        var cell = game.grid.getCell(0, 2);
        var liveCount = game.liveNeighbours(cell);
        chai_1.expect(liveCount).to.be.equal(3);
    });
    it('should generate correct state of grid on iteration as per game rules', function () {
        game.nextIteration();
        chai_1.expect(game.grid.getCell(0, 0).isAlive).to.be.true;
        chai_1.expect(game.grid.getCell(0, 1).isAlive).to.be.true;
        chai_1.expect(game.grid.getCell(0, 2).isAlive).to.be.true;
        chai_1.expect(game.grid.getCell(1, 0).isAlive).to.be.true;
        chai_1.expect(game.grid.getCell(1, 1).isAlive).to.be.false;
        chai_1.expect(game.grid.getCell(1, 0).isAlive).to.be.true;
        chai_1.expect(game.grid.getCell(2, 0).isAlive).to.be.false;
        chai_1.expect(game.grid.getCell(2, 1).isAlive).to.be.false;
        chai_1.expect(game.grid.getCell(2, 2).isAlive).to.be.true;
    });
});
//# sourceMappingURL=game.test.js.map