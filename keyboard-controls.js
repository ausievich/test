// Добавляем события для вращения решетки кнопкой
document.addEventListener('keydown', (event) => {
    if (document.activeElement.tagName !== 'TEXTAREA') {
        if (event.key === 'ArrowRight') {
            rotationAngle = (rotationAngle + 90);
            rotateGrilleElement();
        }

        if (event.key === 'ArrowLeft') {
            rotationAngle = (rotationAngle - 90);
            rotateGrilleElement();
        }

        if (event.key === 'Tab') {
            const grille = document.querySelector('.grille');
            grille.style.display = grille.style.display === 'none' ? 'grid' : 'none';
        }

    }
});
