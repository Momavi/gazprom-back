class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def __str__(self):
        return f"{self.title} by {self.author}, {self.year}"


class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def remove_book(self, title):
        for book in self.books:
            if book.title == title:
                self.books.remove(book)
                return True
        return False

    def find_book(self, title):
        for book in self.books:
            if book.title == title:
                return book
        return None

    def print_books(self):
        for book in self.books:
            print(book)


def main():
    library = Library()
    while True:
        print("\nWelcome to the library!")
        print("1. Add a book")
        print("2. Remove a book")
        print("3. Find a book")
        print("4. Print all books")
        print("5. Exit")
        choice = input("Please choose an option: ")
        if choice == '1':
            title = input("Enter the title of the book: ")
            author = input("Enter the author of the book: ")
            year = input("Enter the year of the book: ")
            book = Book(title, author, year)
            library.add_book(book)
            print("Book added successfully!")
        elif choice == '2':
            title = input("Enter the title of the book: ")
            if library.remove_book(title):
                print("Book removed successfully!")
            else:
                print("Book not found!")
        elif choice == '3':
            title = input("Enter the title of the book: ")
            book = library.find_book(title)
            if book:
                print(book)
            else:
                print("Book not found!")
        elif choice == '4':
            library.print_books()
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
