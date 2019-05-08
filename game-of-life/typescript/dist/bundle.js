(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GameOfLife = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(r, c, isAlive = false) {
        this.r = r;
        this.c = c;
        this.isAlive = isAlive;
    }
}
exports.Cell = Cell;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./models/game");
let defaults = { height: 85, width: 125, speed: 100 };
let game;
let iterate;
let gameInProgress = false;
function main() {
    setDefaults();
    initGame();
}
exports.main = main;
function setDefaults() {
    document.getElementById('heightInput').value = String(defaults.height);
    document.getElementById('widthInput').value = String(defaults.width);
    document.getElementById('speedInput').value = String(defaults.speed);
}
function getSettings() {
    let settings = {
        width: parseInt(document.getElementById('widthInput').value),
        height: parseInt(document.getElementById('heightInput').value),
        speed: parseInt(document.getElementById('speedInput').value)
    };
    return settings;
}
function buildTableHtml(game) {
    let table = document.createElement('table');
    table.setAttribute('class', 'game-table');
    for (let r = 0; r < game.grid.height; r++) {
        let tr = document.createElement('tr');
        for (let c = 0; c < game.grid.width; c++) {
            let td = document.createElement('td');
            td.setAttribute('id', `row-${r}-col-${c}`);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
function updateViewHtml() {
    for (let r = 0; r < game.grid.height; r++) {
        for (let c = 0; c < game.grid.width; c++) {
            let cell = game.grid.getCell(r, c);
            let htmlCell = document.getElementById(`row-${r}-col-${c}`);
            htmlCell.setAttribute('class', cell.isAlive ? 'live' : 'dead');
        }
    }
}
function initGame() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    let settings = getSettings();
    game = new game_1.Game(settings.height, settings.width, settings.speed, 0);
    outputDiv.append(buildTableHtml(game));
    updateViewHtml();
}
exports.initGame = initGame;
function playGame() {
    if (!gameInProgress) {
        iterate = setInterval(() => {
            if (game.currentIteration < game.maxIterations) {
                game.nextIteration();
                game.currentIteration++;
                updateViewHtml();
            }
            else {
                stopGame();
            }
        }, game.speed);
        gameInProgress = true;
    }
}
exports.playGame = playGame;
function stopGame() {
    gameInProgress = false;
    clearInterval(iterate);
}
exports.stopGame = stopGame;
function resetGame() {
    stopGame();
    setDefaults();
    initGame();
}
exports.resetGame = resetGame;
function applyChanges() {
    if (gameInProgress) {
        stopGame();
        initGame();
        playGame();
    }
    else {
        initGame();
    }
}
exports.applyChanges = applyChanges;

},{"./models/game":3}],3:[function(require,module,exports){
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

},{"./grid":4}],4:[function(require,module,exports){
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

},{"../entities/cell":1}]},{},[2])(2)
});