document.body.innerHTML = `<div class="container">
<header>
<button class="button new-game">New game</button>
</header>
<div class="square">
</div>
</div>`;
const SQUARE = document.querySelector(".square");

const RANDOM = () => {
  let size = 17,
    arr = [],
    array = [];

  for (let i = 1; i < size; i++) {
    arr.push(i);
  }

  for (let i = 1; i < size; i++) {
    let value = arr.splice(Math.round(Math.random() * (size - i - 1)), 1);
    array.push(value.pop());
  }
  return array;
};

let randomArray = RANDOM();

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

arr.forEach((elem) => {
  const CELL = document.createElement("div");
  CELL.className = "cell";

  CELL.innerHTML = elem;
  CELL.dataset.number = elem;

  SQUARE.append(CELL);
});

// randomArray.forEach((elem) => {
//   const CELL = document.createElement("div");
//   CELL.className = "cell";

//   CELL.innerHTML = elem;
//   CELL.dataset.number = elem;

//   SQUARE.append(CELL);
// });

// Create game field by matrix

const CELLS = document.querySelectorAll(".cell");
const CELLS_ARRAY = Array.from(CELLS);

// CELLS_ARRAY.forEach((cell) => {
//   cell.addEventListener("click", () => {
//     console.log("2");
//   });
// });

const MATRIX = [[], [], [], []];

const getMatrix = (array) => {
  let y = 0;
  let x = 0;

  for (let i = 0; i < array.length; i++) {
    if (x > 3) {
      y++;
      x = 0;
    }

    MATRIX[y][x] = array[i];
    x++;
  }

  return MATRIX;
};

const matrixItem = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      const node = CELLS_ARRAY[value - 1];
      matrixItemPosition(node, x, y);
    }
  }
};

const matrixItemPosition = (node, x, y) => {
  const WIDTH = 100;
  node.style.transform = `translate3D(${x * WIDTH}%, ${y * WIDTH}%, 0)`;
};

let matrix = getMatrix(randomArray);
matrixItem(matrix);

// New game without reload the page

const NEW_GAME = document.querySelector(".new-game");

NEW_GAME.addEventListener("click", () => {
  let reloadMatrix = getMatrix(RANDOM());
  matrixItem(reloadMatrix);
});

// Add movement for cells

const emptyCell = 16;
CELLS_ARRAY[emptyCell - 1].style.display = "none";

const getCoordinates = (cellnumber, matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === cellnumber) {
        return { x, y };
      }
    }
  }
};

const move = (cellCoordinates, emptyCellCoordinates, matrix) => {
  const cellCoordinatesNumber = matrix[cellCoordinates.y][cellCoordinates.x];
  matrix[cellCoordinates.y][cellCoordinates.x] = matrix[emptyCellCoordinates.y][emptyCellCoordinates.x];
  matrix[emptyCellCoordinates.y][emptyCellCoordinates.x] = cellCoordinatesNumber;
};

CELLS_ARRAY.forEach((el) => {
  el.addEventListener("click", (event) => {
    const cellItem = event.target.closest("div");

    const cellNumber = Number(cellItem.dataset.number);
    const cellCoordinates = getCoordinates(cellNumber, matrix);
    const emptyCellCoordinates = getCoordinates(emptyCell, matrix);

    const isPossible = (cellCoordinates, emptyCellCoordinates) => {
      const diffX = Math.abs(cellCoordinates.x - emptyCellCoordinates.x);
      const diffY = Math.abs(cellCoordinates.y - emptyCellCoordinates.y);

      return (
        (diffX === 1 || diffY === 1) &&
        (cellCoordinates.x === emptyCellCoordinates.x ||
          cellCoordinates.y === emptyCellCoordinates.y)
      );
    };

    const isValid = isPossible(cellCoordinates, emptyCellCoordinates);
    console.log(isValid);

    if (isValid) {
      move(cellCoordinates, emptyCellCoordinates, matrix);
      matrixItem(matrix);
    }
  });
});
