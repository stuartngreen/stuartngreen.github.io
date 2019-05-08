"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./models/game");
function main() {
    let width = parseInt(document.getElementById('widthInput').value);
    let height = parseInt(document.getElementById('heightInput').value);
    let game = new game_1.Game(width, height);
    game.grid.randomise();
    render(game);
}
exports.main = main;
function render(game) {
    const div = document.getElementById('output');
    const table = buildHtmlTable(game);
    div.innerHTML = '';
    div.appendChild(table);
}
function buildHtmlTable(game) {
    let table = document.createElement('table');
    table.setAttribute('class', 'game-table');
    for (let r = 0; r < game.height; r++) {
        let tr = document.createElement('tr');
        for (let c = 0; c < game.width; c++) {
            let cell = game.grid.getCell(r, c);
            let td = document.createElement('td');
            td.setAttribute('id', `row-${r}-col-${c}`);
            if (cell.isAlive) {
                td.setAttribute('class', 'live-cell');
            }
            else {
                td.setAttribute('class', 'dead-cell');
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
//# sourceMappingURL=game-of-life.js.map