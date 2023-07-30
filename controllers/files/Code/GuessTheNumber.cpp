#include <iostream>
#include <ctime> // для функции time
#include <cstdlib> // для функций srand и rand

int main() {
    srand(time(0)); // Инициализация генератора случайных чисел

    int secretNumber = rand() % 100 + 1; // Генерация случайного числа от 1 до 100
    int userGuess; // Переменная для хранения предположения пользователя
    int attempts = 0; // Счетчик попыток

    std::cout << "Добро пожаловать в игру 'Угадай число'! Компьютер загадал число от 1 до 100.\n";

    // Основной игровой цикл
    while (true) {
        std::cout << "Введите ваше число: ";
        std::cin >> userGuess; // Получение числа от пользователя

        attempts++; // Увеличение счетчика попыток

        // Проверка, правильно ли пользователь угадал число
        if (userGuess == secretNumber) {
            std::cout << "Поздравляем! Вы угадали число с " << attempts << " попытки.\n";
            break; // Выход из цикла, если число угадано
        } else if (userGuess < secretNumber) {
            std::cout << "Ваше число меньше загаданного.\n";
        } else {
            std::cout << "Ваше число больше загаданного.\n";
        }
    }

    return 0;
}
