/* eslint-disable no-console */
const getRandomizedArray = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const generateNewField = () => {
  const values = getRandomizedArray();
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

const handle = (event) => {
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
  }
};

const refreshField = () => {
  const div = document.querySelector('.gem-puzzle');
  div.innerHTML = '';
  div.append(generateNewField());
};

const run = () => {
  refreshField();
  document.querySelector('.gem-puzzle').addEventListener('click', handle);
  document.querySelector('.title').addEventListener('click', refreshField);
};

run();
