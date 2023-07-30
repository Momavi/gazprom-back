// Импортируем необходимые библиотеки
using System;
using System.Collections.Generic;

// Определяем класс Employee (Сотрудник)
public class Employee
{
    public string Name { get; set; }  // Имя
    public decimal Salary { get; set; } // Зарплата
}

// Определяем класс ReportGenerator (Генератор Отчетов)
public class ReportGenerator
{
    private List<Employee> _employees;

    public ReportGenerator(List<Employee> employees)
    {
        // Сохраняем список сотрудников
        _employees = employees;
    }

    // Генерируем отчет
    public void GenerateReport()
    {
        Console.WriteLine("Отчет о зарплате сотрудников");
        Console.WriteLine("-----------------------------");

        // Проходим по каждому сотруднику
        foreach (var employee in _employees)
        {
            // Выводим информацию о сотруднике
            Console.WriteLine("Имя: {0}, Зарплата: {1}", employee.Name, employee.Salary);
        }
    }
}

public class Program
{
    public static void Main()
    {
        // Создаем список сотрудников
        var employees = new List<Employee>
        {
            new Employee { Name = "Иван", Salary = 50000 },
            new Employee { Name = "Сергей", Salary = 60000 },
            new Employee { Name = "Анна", Salary = 70000 },
        };

        // Создаем генератор отчетов
        var reportGenerator = new ReportGenerator(employees);

        // Генерируем и выводим отчет
        reportGenerator.GenerateReport();
    }
}
