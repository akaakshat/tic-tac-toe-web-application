// script.js
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
let player1, player2, player1Symbol, player2Symbol, currentPlayer;
let circleTurn;

startButton.addEventListener('click', setupGame);
restartButton.addEventListener('click', startGame);

function setupGame() {
    player1 = player1Input.value || 'Player 1';
    player2 = player2Input.value || 'Player 2';
    player1Symbol = document.querySelector('input[name="symbol"]:checked').value;
    player2Symbol = player1Symbol === 'x' ? 'circle' : 'x';
    currentPlayer = player1;
    circleTurn = player1Symbol === 'circle';
    startGame();
}

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    updateCurrentPlayerDisplay();
    removeConfetti();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        updateCurrentPlayerDisplay();
    }
}

function endGame(draw) {
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${currentPlayer} Wins!`);
        showConfetti();
    }
    startGame();
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
    currentPlayer = circleTurn ? player2 : player1;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = `${currentPlayer}'s turn (${circleTurn ? 'O' : 'X'})`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function showConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
    }
}

function removeConfetti() {
    const confettis = document.querySelectorAll('.confetti');
    confettis.forEach(confetti => confetti.remove());
}
