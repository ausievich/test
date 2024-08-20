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