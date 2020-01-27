/* eslint-disable no-console */
const getShuffledArray = () => {
  const array = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12];
  // for (let i = array.length - 1; i > 0; i -= 1) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   const temp = array[i];
  //   array[i] = array[j];
  //   array[j] = temp;
  // }
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
  const heading2 = document.querySelector('.heading2');
  const div = document.querySelector('.gem-puzzle');
  heading.innerHTML = 'Game of Fifteen';
  heading2.innerHTML = '';
  heading.classList.remove('rainbow');
  div.innerHTML = '';
  div.append(generateNewField());
};

const isPuzzleSolved = () => {
  const cells = document.querySelectorAll('.cell');
  const cellsValues = [...cells].map((cell) => +cell.textContent);
  for (let i = 0; i < cellsValues.length - 1; i += 1) {
    if (cellsValues[i] !== i + 1) return false;
  }
  return true;
};

const getCongrats = () => {
  const heading = document.querySelector('.heading');
  const heading2 = document.querySelector('.heading2');
  if (isPuzzleSolved()) {
    heading.innerHTML = 'You win!';
    heading2.innerHTML = 'auto-restart in 5 sec...';
    heading.classList.add('rainbow');
    setTimeout(refreshField, 5000);
  }
};

const handleClick = (event) => {
  const clickedCell = event.target;
  const emptyCell = document.querySelector('.empty-cell');

  console.log('CLICKED', 'x:', clickedCell.cellIndex, 'y:', clickedCell.parentNode.rowIndex);
  console.log('EMPTY', 'x:', emptyCell.cellIndex, 'y:', emptyCell.parentNode.rowIndex);
  console.log('num:', clickedCell.textContent);

  const clickedCellX = clickedCell.cellIndex;
  const clickedCellY = clickedCell.parentNode.rowIndex;
  const emptyCellX = emptyCell.cellIndex;
  const emptyCellY = emptyCell.parentNode.rowIndex;

  const distance = Math.abs(clickedCellX - emptyCellX) + Math.abs(clickedCellY - emptyCellY);

  if (distance === 1) {
    emptyCell.classList.remove('empty-cell');
    emptyCell.textContent = clickedCell.textContent;

    clickedCell.classList.add('empty-cell');
    clickedCell.textContent = '';
    getCongrats();
    console.log('isGameDone(): ', isPuzzleSolved());
  }
};

const handleKey = (event) => {
  const pressedKey = event.code;
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

  console.log('EMPTY', 'x:', emptyCell.cellIndex, 'y:', emptyCell.parentNode.rowIndex);
  console.log('TARGET', 'x:', targetCellX, 'y:', targetCellY);
  console.log('key:', pressedKey);

  if (targetCellX < 4 && targetCellX >= 0 && targetCellY < 4 && targetCellY >= 0) {
    const targetCell = document.querySelector('table').rows[targetCellY].cells[targetCellX];

    emptyCell.classList.remove('empty-cell');
    emptyCell.textContent = targetCell.textContent;

    targetCell.classList.add('empty-cell');
    targetCell.textContent = '';
    getCongrats();
  }
};

const run = () => {
  refreshField();
  document.querySelector('.heading').addEventListener('click', refreshField);
  document.querySelector('.gem-puzzle').addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKey);
};

run();
