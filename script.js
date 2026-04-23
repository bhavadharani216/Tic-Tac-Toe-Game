let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer} Turn`;
}

function checkWinner() {
  for (let condition of winConditions) {
    let [a, b, c] = condition;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;

      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      statusText.textContent = `🎉 Player ${board[a]} Wins!`;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });

  statusText.textContent = "Player X Turn";
}