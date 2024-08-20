// Функция для создания ячеек с отверстиями на основе решетки
function createGrille(grid, size = 6) {
    const grille = document.querySelector('.grille');
    grille.innerHTML = ''; // Очищаем предыдущие элементы

    grid.forEach((row) => {
        row.forEach((cell) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            if (cell === 1) {
                cellElement.classList.add('hole');
            }
            grille.appendChild(cellElement);
        });
    });
}


// Функция для поворота решетки
function rotateGrille() {
    const grille = document.querySelector('.grille');
    grille.style.transform = `rotate(${rotationAngle}deg)`;
}

// Переменные для хранения состояния
let grid = generateGrille(6);
let rotationAngle = 0;
createGrille(grid);

// Событие для кнопки Shuffle
document.getElementById('shuffleButton').addEventListener('click', () => {
    grid = generateGrille(6);
    createGrille(grid);
    createGrid()
});

// Событие для кнопки Rotate
document.getElementById('rotateButton').addEventListener('click', () => {
    rotationAngle = (rotationAngle + 90);
    rotateGrille();
});

// Событие для кнопки Toggle
document.getElementById('toggleButton').addEventListener('click', () => {
    const grille = document.querySelector('.grille');
    grille.style.display = grille.style.display === 'none' ? 'grid' : 'none';
});

// Встроенная функция генерации решетки
function generateGrille(size = 6) {

    let holes = Array.from({ length: size }, () => Array(size).fill(0));
    const grille = Array.from({ length: size }, () => Array(size).fill(0));
    let howManyHoles = 0;

    const maxAttempts = 300;
    let attempts = 0;

    while (howManyHoles !== size ** 2 / 4) {
        if (attempts > maxAttempts) break;

        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (holes[row][col] === 0 && cellIsValid(row, col, grille)) {
            howManyHoles++;
            grille[row][col] = 1;

            for (let i = 0; i < 4; i++) {
                holes[row][col] = 1;
                holes = rotate90(holes);
            }
        }

        attempts++;
    }

    return howManyHoles === size ** 2 / 4 ? grille : generateGrille(size = 6);
}

// Встроенная функция поворота на 90 градусов
function rotate90(matrix) {
    const size = matrix.length;
    const rotatedMatrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            rotatedMatrix[j][size - 1 - i] = matrix[i][j];
        }
    }

    return rotatedMatrix;
}

// Встроенная функция проверки валидности ячейки
function cellIsValid(row, col, grille) {
    const size = grille.length;

    const upperNeighbour = row - 1 >= 0 ? grille[row - 1][col] : 0;
    const bottomNeighbour = row + 1 < size ? grille[row + 1][col] : 0;
    const rightNeighbour = col + 1 < size ? grille[row][col + 1] : 0;
    const leftNeighbour = col - 1 >= 0 ? grille[row][col - 1] : 0;

    const cellHasSideNeighbour = upperNeighbour || bottomNeighbour || rightNeighbour || leftNeighbour;

    const upperLeft = (row - 1 >= 0 && col - 1 >= 0) ? grille[row - 1][col - 1] : 0;
    const upperRight = (row - 1 >= 0 && col + 1 < size) ? grille[row - 1][col + 1] : 0;
    const bottomLeft = (row + 1 < size && col - 1 >= 0) ? grille[row + 1][col - 1] : 0;
    const bottomRight = (row + 1 < size && col + 1 < size) ? grille[row + 1][col + 1] : 0;

    const cellHasFourDiagonalNeighbours = upperLeft && upperRight && bottomLeft && bottomRight;

    return true;
}

function fillMatrixWithText(grille) {
    const textString = "Когдаябылребенком,отецписалмнеписьма";
    const size = grille.length

    let cursor = 0;
    const matrixWithText = Array.from({ length: size }, () => Array(size).fill(0));

    for (let rotations = 0; rotations < 4; rotations++) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grille[i][j] === 1) {
                    matrixWithText[i][j] = textString[cursor]
                    cursor++;
                }
            }
        }

        grille = rotate90(grille);
    }

    console.log(matrixWithText)
    return matrixWithText
}

// Функция для создания блока с зашифрованным текстом
function createGrid() {
    const text = fillMatrixWithText(grid)

    const gridElement = document.querySelector('.grid');
    gridElement.innerHTML = ''; // Очищаем предыдущие элементы

    text.forEach((row) => {
        row.forEach((cell) => {
            const letterElement = document.createElement('div');
            letterElement.classList.add('cell');
            letterElement.innerHTML = cell;
            gridElement.appendChild(letterElement);
        });
    });
}

createGrid()
