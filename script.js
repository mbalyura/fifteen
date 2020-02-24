/* eslint-disable no-param-reassign */

let movesCount = 0;
let startTime = 0;

const getShuffledArray = () => {
  const array = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const generateNewField = () => {
  const values = getShuffledArray();
  const tableEl = document.createElement('table');

  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'cell';
      if (i === 3 && j === 3) {
        cell.classList.add('empty-cell');
      } else {
        cell.textContent = values[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

const refreshField = () => {
  const heading = document.querySelector('.heading');
  const subheading = document.querySelector('.subheading');
  const table = document.querySelector('.table-container');
  const result = document.querySelector('.result-container');
  heading.innerHTML = 'Game of Fifteen';
  subheading.innerHTML = '';
  result.innerHTML = '';
  heading.classList.remove('rainbow');
  table.innerHTML = '';
  startTime = new Date();
  console.log('timeCount: ', startTime);
  table.append(generateNewField());
};

const isPuzzleSolved = () => {
  const cells = document.querySelectorAll('.cell');
  const cellsValues = [...cells].map((cell) => +cell.textContent);
  for (let i = 0; i < cellsValues.length - 1; i += 1) {
    if (cellsValues[i] !== i + 1) return false;
  }
  return true;
};

const restartGame = () => {
  if (isPuzzleSolved()) {
    const heading = document.querySelector('.heading');
    const subheading = document.querySelector('.subheading');
    const result = document.querySelector('.result-container');
    const endTime = new Date();
    const gameTime = Math.floor((endTime - startTime) / 1000);
    heading.innerHTML = 'You win!';
    subheading.innerHTML = 'auto-restart in 5 sec...';
    result.innerHTML = `Your result is ${movesCount} steps and ${gameTime} seconds`;
    heading.classList.add('rainbow');
    movesCount = 0;
    startTime = 0;
    setTimeout(refreshField, 5000);
  }
};

const makeMove = (emptyCell, targetCell) => {
  emptyCell.classList.remove('empty-cell');
  emptyCell.textContent = targetCell.textContent;

  targetCell.classList.add('empty-cell');
  targetCell.textContent = '';
  movesCount += 1;
  restartGame();
};

const handleClick = (event) => {
  const clickedCell = event.target;
  const emptyCell = document.querySelector('.empty-cell');

  const clickedCellX = clickedCell.cellIndex;
  const clickedCellY = clickedCell.parentNode.rowIndex;
  const emptyCellX = emptyCell.cellIndex;
  const emptyCellY = emptyCell.parentNode.rowIndex;

  const distance = Math.abs(clickedCellX - emptyCellX) + Math.abs(clickedCellY - emptyCellY);

  if (distance === 1) makeMove(emptyCell, clickedCell);
};

const handleKey = (event) => {
  const pressedKey = event.key;
  const emptyCell = document.querySelector('.empty-cell');

  const emptyCellX = emptyCell.cellIndex;
  const emptyCellY = emptyCell.parentNode.rowIndex;
  let targetCellX = emptyCellX;
  let targetCellY = emptyCellY;

  if (pressedKey === 'ArrowUp') targetCellY += 1;
  if (pressedKey === 'ArrowDown') targetCellY -= 1;
  if (pressedKey === 'ArrowLeft') targetCellX += 1;
  if (pressedKey === 'ArrowRight') targetCellX -= 1;
  if (pressedKey === 'KeyR') {
    refreshField();
    return;
  }

  if (targetCellX < 4 && targetCellX >= 0 && targetCellY < 4 && targetCellY >= 0) {
    const targetCell = document.querySelector('table').rows[targetCellY].cells[targetCellX];

    makeMove(emptyCell, targetCell);
  }
};

const run = () => {
  refreshField();
  document.querySelector('.heading').addEventListener('click', refreshField);
  document.querySelector('.table-container').addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKey);
};

run();
