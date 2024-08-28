// Добавляем события для вращения решетки кнопкой
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        rotationAngle = (rotationAngle + 90);
        rotateGrille();
    }

    if (event.key === 'ArrowLeft') {
        rotationAngle = (rotationAngle - 90);
        rotateGrille();
    }

    // if (event.key === ' ') {
    //     const grille = document.querySelector('.grille');
    //     grille.style.display = grille.style.display === 'none' ? 'grid' : 'none';
    // }
    //
    // if (event.key === 'Tab') {
    //     grid = generateGrille(6);
    //     createGrille(grid);
    //     createGrid()
    // }

});



// Логика смещения блоков
let currentPosition = 0;

document.addEventListener('keydown', function(event) {
    const gridElements = document.querySelectorAll('.grid')

    const margin = 50;

    // Высота одного блока, на которую будем смещать элементы
    const gridHeight = gridElements[0].offsetHeight + margin;

    if (event.key === 'ArrowDown') {
        if (currentPosition < gridElements.length - 1) {
            currentPosition +=1
        }
    } else if (event.key === 'ArrowUp') {
        if (currentPosition > 0) {
            currentPosition -=1
        }
    }

    gridElements.forEach(el => {
        el.style.transform = `translateY(-${gridHeight * (currentPosition)}px)`;
    })

});


