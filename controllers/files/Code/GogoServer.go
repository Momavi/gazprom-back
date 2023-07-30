// Импортируем необходимые пакеты
package main

import (
	"fmt"
	"net/http"
)

// Обработчик для домашней страницы
func homePage(w http.ResponseWriter, r *http.Request) {
	// Отправляем клиенту сообщение
	fmt.Fprintf(w, "Добро пожаловать на домашнюю страницу!")
}

// Обработчик для страницы приветствия
func greetPage(w http.ResponseWriter, r *http.Request) {
	// Получаем имя из параметров запроса
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "Гость"
	}
	// Отправляем клиенту приветственное сообщение
	fmt.Fprintf(w, "Привет, %s!", name)
}

func main() {
	// Создаем маршруты
	http.HandleFunc("/", homePage)             // домашняя страница
	http.HandleFunc("/greet", greetPage)       // страница приветствия

	// Запускаем веб-сервер на порту 8080
	fmt.Println("Запуск сервера на порту 8080...")
	http.ListenAndServe(":8080", nil)
}
