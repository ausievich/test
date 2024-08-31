document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const container = document.querySelector('.container');
    let currentGrid = document.querySelector('.grid-0');
    let gridCount = 1;
    let currentPosition = 0; // Текущая позиция для смещения

    // Обработчик события ввода
    textInput.addEventListener('input', () => {
        const text = textInput.value;

        // Сохраняем текущие трансформации всех .grid элементов
        const transforms = Array.from(container.querySelectorAll('.grid')).map(grid => grid.style.transform);

        // Очищаем контейнер и сбрасываем переменные
        Array.from(container.querySelectorAll('.grid')).forEach(grid => grid.remove());
        currentGrid = null;
        gridCount = 0;

        // Перебираем каждый символ текста
        for (let i = 0; i < text.length; i++) {
            if (i % 36 === 0) {
                currentGrid = document.createElement('div');
                currentGrid.classList.add('grid', `grid-${gridCount}`);
                container.appendChild(currentGrid);
                gridCount++;
            }

            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.textContent = text[i];
            currentGrid.appendChild(newCell);
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
