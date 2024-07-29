document.getElementById('resetGame').disabled = true;
var currentPlayer = 1;
var gameEnded = false;
makeGrid();

document.getElementById('startGame').addEventListener('click', function() {
    launchGame();
});

document.getElementById('resetGame').addEventListener('click', function() {
    makeGrid();
    gameEnded = false;
    document.getElementById('currentPlayer').textContent = '';
    launchGame();
});

function makeGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = "";

    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            gridContainer.appendChild(cell);
        }
    }
}

function launchGame() {
    currentPlayer = 1;

    document.getElementById("resetGame").disabled = false;
    document.getElementById("startGame").disabled = true;
    document.getElementById("grid-container").style.marginLeft = "130px";
    document.getElementById('currentPlayer').style.color = 'red';
    document.getElementById('currentPlayer').textContent = 'Player 1\'s turn : O';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', cellClicked);
    });
}

function cellClicked(event) {
    const cell = event.target;
    const col = parseInt(cell.dataset.col);
    var targetCell = null;

    if (cell.textContent !== '' || gameEnded) {
        return;
    }
    for (let row = 5; row >= 0; row--) {
        const currentCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (currentCell.textContent === '') {
            targetCell = currentCell;
            break;
        }
    }

    if (!targetCell) return;
    if (currentPlayer === 1) {
        targetCell.textContent = 'O';
        targetCell.style.color = 'red';
        if (checkWin('O')) {
            document.getElementById('currentPlayer').style.color = 'red';
            document.getElementById('currentPlayer').textContent = 'Player 1 wins!';
            return;
        }
        document.getElementById('currentPlayer').style.color = 'blue';
        document.getElementById('currentPlayer').textContent = 'Player 2\'s turn : X';
        currentPlayer = 2;
    } else { 
        targetCell.textContent = 'X';
        targetCell.style.color = 'blue';
        if (checkWin('X')) {
            document.getElementById('currentPlayer').style.color = 'blue';
            document.getElementById('currentPlayer').textContent = 'Player 2 wins!';
            return;
        }
        document.getElementById('currentPlayer').style.color = 'red';
        document.getElementById('currentPlayer').textContent = 'Player 1\'s turn : O';

        currentPlayer = 1;
    }
}

function checkWin(player) {
    const cells = document.querySelectorAll('.cell');
    const rows = 6;
    const cols = 7;
    const winLength = 4;

    const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        grid[row][col] = cell.textContent;
    });

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (checkDirection(grid, row, col, 0, 1, player, winLength) ||
                checkDirection(grid, row, col, 1, 0, player, winLength) ||
                checkDirection(grid, row, col, 1, 1, player, winLength) ||
                checkDirection(grid, row, col, 1, -1, player, winLength)) {
                gameEnded = true;
                return true;
            }
        }
    }
    return false;
}

function checkDirection(grid, row, col, rowDir, colDir, player, length) {
    let count = 0;
    for (let i = 0; i < length; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length && grid[r][c] === player) {
            count++;
        } else {
            break;
        }
    }
    return count === length;
}