"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./models/game");
var defaults = { height: 65, width: 85, speed: 50 };
var game;
var iterate;
var gameInProgress = false;
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
    var settings = {
        width: parseInt(document.getElementById('widthInput').value),
        height: parseInt(document.getElementById('heightInput').value),
        speed: parseInt(document.getElementById('speedInput').value)
    };
    return settings;
}
function buildTableHtml(game) {
    var table = document.createElement('table');
    table.setAttribute('class', 'game-table');
    for (var r = 0; r < game.grid.height; r++) {
        var tr = document.createElement('tr');
        for (var c = 0; c < game.grid.width; c++) {
            var td = document.createElement('td');
            td.setAttribute('id', "row-" + r + "-col-" + c);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
function updateViewHtml() {
    for (var r = 0; r < game.grid.height; r++) {
        for (var c = 0; c < game.grid.width; c++) {
            var cell = game.grid.getCell(r, c);
            var htmlCell = document.getElementById("row-" + r + "-col-" + c);
            htmlCell.setAttribute('class', cell.isAlive ? 'live' : 'dead');
        }
    }
}
function initGame() {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    var settings = getSettings();
    game = new game_1.Game(settings.height, settings.width, settings.speed, 0);
    outputDiv.append(buildTableHtml(game));
    updateViewHtml();
}
exports.initGame = initGame;
function playGame() {
    if (!gameInProgress) {
        iterate = setInterval(function () {
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
//# sourceMappingURL=main.js.map