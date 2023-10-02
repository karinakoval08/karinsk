const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function countLetter(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i).toLowerCase() === letter.toLowerCase()) {
            count++;
        }
    }
    return count;
}

function getRow(firstRow, secondRow, letter = 'а') {
    const firstCount = countLetter(firstRow, letter);
    const secondCount = countLetter(secondRow, letter);

    if (firstCount > secondCount) {
        return firstRow;
    } else if (firstCount < secondCount) {
        return secondRow;
    } else {
        return 'Количество букв одинаково в обеих строках!';
    }
}

// Для интерактивности
const userLetter = prompt("Введите букву, которую хотите посчитать:");
const userFirstRow = prompt("Введите первую строку:");
const userSecondRow = prompt("Введите вторую строку:");

alert(getRow(userFirstRow, userSecondRow, userLetter));
