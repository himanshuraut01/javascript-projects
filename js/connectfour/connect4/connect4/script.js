const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'red';
let gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));

function createBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }
}

function resetBoard() {
    currentPlayer = 'red';
    gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));
    board.innerHTML = '';
    createBoard();
    message.innerText = '';
}

function checkWin() {
    // Check rows
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row][col + 1] === currentPlayer &&
                gameBoard[row][col + 2] === currentPlayer &&
                gameBoard[row][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check columns
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col] === currentPlayer &&
                gameBoard[row + 2][col] === currentPlayer &&
                gameBoard[row + 3][col] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonals
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col + 1] === currentPlayer &&
                gameBoard[row + 2][col + 2] === currentPlayer &&
                gameBoard[row + 3][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col - 1] === currentPlayer &&
                gameBoard[row + 2][col - 2] === currentPlayer &&
                gameBoard[row + 3][col - 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== null));
}

function handleClick(event) {
    const col = event.target.dataset.col;
    const row = event.target.dataset.row;
    if (col === undefined || row === undefined) return;

    const availableRow = findAvailableRow(parseInt(col, 10));
    if (availableRow === -1 || availableRow !== parseInt(row, 10)) {
        alert('Please click on the bottom-most available cell in this column.');
        return;
    }

    // Get the cell corresponding to the available row and column
    const cell = board.querySelector(`.cell[data-row='${availableRow}'][data-col='${col}']`);

    // Apply the player's move to the gameBoard and update the cell's color
    gameBoard[availableRow][col] = currentPlayer;
    cell.style.backgroundColor = currentPlayer;

    // Check for a win or draw condition
    if (checkWin()) {
        message.innerText = `${currentPlayer.toUpperCase()} wins!`;
        board.removeEventListener('click', handleClick);
    } else if (checkDraw()) {
        message.innerText = 'It\'s a draw!';
        board.removeEventListener('click', handleClick);
    } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    }
}

function findAvailableRow(col) {
    for (let row = 5; row >= 0; row--) {
        if (gameBoard[row][col] === null) {
            return row;
        }
    }
    return -1;
}

createBoard();
board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetBoard);
