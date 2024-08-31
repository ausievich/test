// Переменные для хранения состояния
let grilleMatrix = generateGrilleMatrix(6);
let orderMatrix = enumerateField(grilleMatrix);

let rotationAngle = 0;
createGrilleElement(grilleMatrix);

// Функция для создания ячеек с отверстиями на основе решетки
function createGrilleElement(grilleMatrix, size = 6) {
    const grilleElement = document.querySelector('.grille');
    grilleElement.innerHTML = ''; // Очищаем предыдущие элементы

    grilleMatrix.forEach((row) => {
        row.forEach((cell) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            if (cell !== 0) { // добавить расчет от size
                cellElement.classList.add('hole');
            }
            grilleElement.appendChild(cellElement);
        });
    });
}

// Функция для поворота решетки
function rotateGrilleElement() {
    const grille = document.querySelector('.grille');
    grille.style.transform = `rotate(${rotationAngle}deg)`;
}


// Встроенная функция генерации решетки
function generateGrilleMatrix(size = 6) {

    let field = Array.from({ length: size }, () => Array(size).fill(0));
    const grille = Array.from({ length: size }, () => Array(size).fill(0));
    let howManyHoles = 0;

    const maxAttempts = 300;
    let attempts = 0;

    while (howManyHoles !== size ** 2 / 4) {
        if (attempts > maxAttempts) break;

        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (field[row][col] === 0 && cellIsValid(row, col, grille)) {
            grille[row][col] = '*';
            howManyHoles++;

            for (let i = 0; i < 4; i++) {
                field[row][col] = '*';
                field = rotate90(field);
            }
        }

        attempts++;
    }


    return howManyHoles === size ** 2 / 4 ? grille : generateGrilleMatrix(size = 6);
}

function enumerateField(grille) {
    const size = grille.length;
    const field = Array.from({ length: size }, () => Array(size).fill(0));

    let counter = 1;

    for (let turn = 0; turn < 4; turn++) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grille[i][j] === '*') {
                    field[i][j] = counter
                    counter++
                }
            }
        }

        grille = rotate90(grille);

    }

    return field;
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
    // const size = grille.length;
    //
    // const upperNeighbour = row - 1 >= 0 ? grille[row - 1][col] : 0;
    // const bottomNeighbour = row + 1 < size ? grille[row + 1][col] : 0;
    // const rightNeighbour = col + 1 < size ? grille[row][col + 1] : 0;
    // const leftNeighbour = col - 1 >= 0 ? grille[row][col - 1] : 0;
    //
    // const cellHasSideNeighbour = upperNeighbour || bottomNeighbour || rightNeighbour || leftNeighbour;
    //
    // const upperLeft = (row - 1 >= 0 && col - 1 >= 0) ? grille[row - 1][col - 1] : 0;
    // const upperRight = (row - 1 >= 0 && col + 1 < size) ? grille[row - 1][col + 1] : 0;
    // const bottomLeft = (row + 1 < size && col - 1 >= 0) ? grille[row + 1][col - 1] : 0;
    // const bottomRight = (row + 1 < size && col + 1 < size) ? grille[row + 1][col + 1] : 0;
    //
    // const cellHasFourDiagonalNeighbours = upperLeft && upperRight && bottomLeft && bottomRight;

    return true;
}

// Событие для кнопки Shuffle
document.getElementById('shuffleButton').addEventListener('click', () => {
    grilleMatrix = generateGrilleMatrix(6);
    createGrilleElement(grilleMatrix);
    orderMatrix = enumerateField(grilleMatrix);

});

// Событие для кнопки Rotate
document.getElementById('rotateButton').addEventListener('click', () => {
    rotationAngle = (rotationAngle + 90);
    rotateGrilleElement();
});

// Событие для кнопки Toggle
document.getElementById('toggleButton').addEventListener('click', () => {
    const grille = document.querySelector('.grille');
    grille.style.display = grille.style.display === 'none' ? 'grid' : 'none';
});


document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const container = document.querySelector('.container');
    let currentGrid = document.querySelector('.grid-0');
    let gridCount = 1;
    let currentPosition = 0; // Текущая позиция для смещения


    // Функция для создания пустого .grid с ячейками
    function createEmptyGrid() {
        const grid = document.createElement('div');
        grid.classList.add('grid', `grid-${gridCount}`);
        grid.style.top = (350 * gridCount) + 'px';
        grid.style.position = 'absolute';
        container.appendChild(grid);

        // Добавляем пустые ячейки по матрице порядка
        for (let i = 0; i < orderMatrix.length; i++) {
            for (let j = 0; j < orderMatrix[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.order = orderMatrix[i][j]; // Сохраняем порядок в дата-атрибуте
                cell.style.visibility = 'hidden'; // Скрываем ячейку по умолчанию
                grid.appendChild(cell);
            }
        }
        gridCount++;
        return grid;
    }

    // Обработчик события ввода
    textInput.addEventListener('input', () => {
        const text = textInput.value.replace(/\s+/g, '');

        if (text.length > 1 && text.length % 9 === 1) {
            rotationAngle = (rotationAngle + 90);
            rotateGrilleElement();

        }

        if (text.length === 0) {
            rotationAngle = 0;
            rotateGrilleElement();
        }

        // Сохраняем текущие трансформации всех .grid элементов
        const transforms = Array.from(container.querySelectorAll('.grid')).map(grid => grid.style.transform);

        // Очищаем контейнер и сбрасываем переменные
        Array.from(container.querySelectorAll('.grid')).forEach(grid => grid.remove());
        gridCount = 0;

        let currentGrid = createEmptyGrid();
        let textIndex = 0;

        // Заполняем ячейки в порядке из матрицы
        while (textIndex < text.length) {

            const cells = Array.from(currentGrid.children); // Получаем ячейки текущей сетки
            for (let i = 0; i < cells.length && textIndex < text.length; i++) {
                const cell = cells.find(c => c.dataset.order == i + 1); // Находим ячейку по порядковому номеру
                if (cell) {
                    cell.textContent = text[textIndex];
                    cell.style.visibility = 'visible'; // Делаем ячейку видимой
                    textIndex++;
                }
            }

            // Если текст не поместился в текущую сетку, создаем новую
            if (textIndex < text.length) {
                currentGrid = createEmptyGrid();
            }
        }

        // Применяем сохраненные трансформации к новым элементам .grid
        container.querySelectorAll('.grid').forEach((grid, index) => {
            if (transforms[index]) {
                grid.style.transform = transforms[index];
            }
        });
    });

    // Логика смещения блоков по вертикали
    document.addEventListener('keydown', function (event) {
        const gridElements = document.querySelectorAll('.grid');
        const margin = 50;
        const gridHeight = gridElements[0]?.offsetHeight + margin || 0;

        if (event.key === 'ArrowDown') {
            if (currentPosition < gridElements.length - 1) {
                currentPosition += 1;
            }
        } else if (event.key === 'ArrowUp') {
            if (currentPosition > 0) {
                currentPosition -= 1;
            }
        }

        // Смещаем все элементы .grid в зависимости от текущей позиции
        gridElements.forEach(el => {
            el.style.transform = `translateY(-${gridHeight * currentPosition}px)`;
        });
    });
});
