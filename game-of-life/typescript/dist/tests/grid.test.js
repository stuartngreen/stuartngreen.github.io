"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var grid_1 = require("../models/grid");
describe('Grid Tests', function () {
    var grid;
    beforeEach(function () {
        grid = new grid_1.Grid(10, 10);
    });
    it('should return cell with valid parameters', function () {
        var cell = grid.getCell(4, 5);
        chai_1.expect(cell).to.be.not.undefined;
        chai_1.expect(cell.r).to.be.equal(4);
        chai_1.expect(cell.c).to.be.equal(5);
    });
    it('should return null with invalid parameters', function () {
        var cell = grid.getCell(-1, -1);
        chai_1.expect(cell).to.be.null;
    });
});
//# sourceMappingURL=grid.test.js.map