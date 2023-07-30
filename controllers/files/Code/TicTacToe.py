# Инициализация игрового поля
board = [' ' for _ in range(9)]

# Функция для отрисовки игрового поля
def print_board():
    row1 = '| {} | {} | {} |'.format(board[0], board[1], board[2])
    row2 = '| {} | {} | {} |'.format(board[3], board[4], board[5])
    row3 = '| {} | {} | {} |'.format(board[6], board[7], board[8])

    print(row1)
    print(row2)
    print(row3)

# Функция для проверки, не занята ли уже ячейка
def is_free_space(cell):
    return board[cell] == ' '

# Функция для проверки, не закончена ли игра
def is_game_over():
    win_conditions = [(0,1,2), (3,4,5), (6,7,8), (0,3,6), (1,4,7), (2,5,8), (0,4,8), (2,4,6)]
    for condition in win_conditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] != ' ':
            print("Игра окончена! Победитель: ", board[condition[0]])
            return True
    if ' ' not in board:
        print("Игра окончена! Ничья!")
        return True
    return False

# Главный цикл игры
while not is_game_over():
    print_board()
    # Ход первого игрока
    cell = int(input("Первый игрок, выберите ячейку (1-9): ")) - 1
    if is_free_space(cell):
        board[cell] = 'X'
    else:
        print("Ячейка уже занята! Попробуйте другую.")
        continue
    if is_game_over():
        break
    print_board()
    # Ход второго игрока
    cell = int(input("Второй игрок, выберите ячейку (1-9): ")) - 1
    if is_free_space(cell):
        board[cell] = 'O'
    else:
        print("Ячейка уже занята! Попробуйте другую.")
        continue
