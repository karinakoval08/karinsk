function formattedPhone(phone) {
    // Убираем все нечисловые символы
    let pureNumbers = phone.replace(/\D/g, '');

    // Проверяем длину
    if (pureNumbers.length !== 10 && pureNumbers.length !== 11) {
        return "Неверный формат номера";
    }

    // Проверяем, начинается ли номер с 8 или 3, и добавляем +3 в начале
    if (pureNumbers.length === 11) {
        if (pureNumbers.charAt(0) === '8' || pureNumbers.charAt(0) === '3') {
            pureNumbers = pureNumbers.substring(1);
        } else {
            return "Неверный формат номера";
        }
    }

    return "+3 (" + pureNumbers.substring(0, 3) + ") " + pureNumbers.substring(3, 6) + "-" + pureNumbers.substring(6, 8) + "-" + pureNumbers.substring(8);
}

// Для интерактивности:
let userInput = prompt("Введите номер телефона:");
alert(formattedPhone(userInput));
