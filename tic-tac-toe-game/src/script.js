const board = document.getElementById('board');
const cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }
}

function handleMove(event) {
  const index = event.target.dataset.index;

  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById('winner').textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
}

createBoard();
