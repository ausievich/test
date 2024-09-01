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

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("textInput");
    const text = "Hello"; // Ваш заготовленный текст
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textarea.value += text[index];
            index++;

            // // Вызов события input для сохранения существующей логики
            // const event = new Event('input');
            // textarea.dispatchEvent(event)

            setTimeout(typeText, 100); // Задержка в миллисекундах между добавлением символов
        }
    }

    typeText(); // Начало анимации
});



document.getElementById('shareButton').addEventListener('click', function() {
    // Получаем все элементы grid и решетку grille
    const grids = document.querySelectorAll('.grid');
    const grille = document.querySelector('.grille');

    // Создаем новый PDF-документ
    const {jsPDF} = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4'); // формат A4

    // Определяем размеры страницы A4 в миллиметрах
    const pageWidth = 210; // Ширина страницы в мм
    const pageHeight = 297; // Высота страницы в мм
    const margin = 10; // Отступы с каждой стороны страницы

    // Используем html2canvas для создания изображений элементов
    const createPDF = async () => {
        const imgWidth = pageWidth - margin * 2; // Ширина изображения с учетом отступов
        // Проходимся по всем элементам grid и добавляем их на страницу
        for (let i = 0; i < grids.length; i++) {
            const canvas = await html2canvas(grids[i]); // Создаем canvas для текущего элемента grid
            const imageData = canvas.toDataURL('image/png'); // Получаем данные изображения

            // Добавляем изображение элемента grid в PDF

            const imgHeight = canvas.height * imgWidth / canvas.width; // Высота изображения с сохранением пропорций
            pdf.addImage(imageData, 'PNG', margin, margin, imgWidth, imgHeight);

            // Если это не последний элемент, добавляем новую страницу
            if (i < grids.length - 1) {
                pdf.addPage();
            }
        }

        // Добавляем решетку на новую страницу
        pdf.addPage(); // Добавляем новую страницу для решетки
        const grilleCanvas = await html2canvas(grille); // Создаем canvas для решетки
        const grilleImageData = grilleCanvas.toDataURL('image/png'); // Получаем данные изображения решетки
        const grilleImgHeight = grilleCanvas.height * imgWidth / grilleCanvas.width; // Высота изображения решетки с сохранением пропорций
        pdf.addImage(grilleImageData, 'PNG', margin, margin, imgWidth, grilleImgHeight);

        // Сохраняем PDF
        pdf.save('secret_letter.pdf');
    };

    createPDF(); // Вызываем функцию для создания PDF
});

