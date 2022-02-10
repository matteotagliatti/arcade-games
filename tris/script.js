const cells = document.querySelectorAll(".cell");
const cellSigns = [];
let turn = 0;

for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];

  cell.addEventListener("click", function () {
    if (cellSigns[i]) {
      /* If something exist inside cellSigns */
      return; /* End function */
    }

    turn++;
    let sign;

    if (turn % 2 === 0) {
      sign = "O";
    } else {
      sign = "X";
    }

    cell.innerText = sign;
    cellSigns[i] = sign;

    /* check victory */
    let hasWon = checkVictory();

    if (hasWon) {
      showMessage(`${sign} has win!`);
    } else if (turn === 9) {
      showMessage(`Draw!`);
    }
  });
}

function checkVictory() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];

    const a = combination[0];
    const b = combination[1];
    const c = combination[2];

    if (
      cellSigns[a] &&
      cellSigns[a] === cellSigns[b] &&
      cellSigns[b] === cellSigns[c]
    ) {
      return true;
    }
  }

  return false;
}
