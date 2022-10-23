// const square = document.createElement("div");
// document.body.appendChild(square);

document.body.innerHTML = `<div class="square"></div>`;
const SQUARE = document.querySelector(".square");

const RANDOM = () => {
  let size = 16,
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

randomArray.forEach((elem) => {
  const CELL = document.createElement("div");
  CELL.className = "cell";
  CELL.innerHTML = elem;

  SQUARE.append(CELL);
});

// Create game field by matrix

const CELLS = document.querySelectorAll(".cell");
const CELLS_ARRAY = Array.from(CELLS);

CELLS_ARRAY.forEach((cell) => {
  cell.addEventListener("click", () => {
    console.log("2");
  });
});

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

