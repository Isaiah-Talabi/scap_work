/*// Game 1: Tic-Tac-Toe
function game1() {
    // Add Tic-Tac-Toe game code here
}*/
function game1() {
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (board.every(cell => cell !== '')) {
            return 'tie';
        }

        return null;
    }

    function render() {
        const container = document.getElementById('gameContainer');
        container.innerHTML = '';

        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => {
                if (cell === '' && !checkWinner()) {
                    board[index] = currentPlayer;
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    render();
                }
            });
            container.appendChild(cellElement);
        });

        const winner = checkWinner();
        if (winner) {
            const message = winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`;
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            container.appendChild(messageElement);
        }
    }

    render();
}


/*// Game 2: Snake
function game2() {
    // Add Snake game code here
}*/
function game2() {
    const boardSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = generateFood();

    function generateFood() {
        return {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        };
    }

    let direction = 'right';
    let gameSpeed = 200;
    let gameInterval = setInterval(moveSnake, gameSpeed);

    function moveSnake() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || isSnakeCollision(head)) {
            clearInterval(gameInterval);
            alert('Game Over!');
            return;
        }

        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
        } else {
            snake.pop();
        }

        render();
    }

    function isSnakeCollision(head) {
        return snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function render() {
        const container = document.getElementById('gameContainer');
        container.innerHTML = '';

        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (snake.some(segment => segment.x === x && segment.y === y)) {
                    cellElement.classList.add('snake');
                } else if (food.x === x && food.y === y) {
                    cellElement.classList.add('food');
                }
                container.appendChild(cellElement);
            }
        }
    }

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    render();
}


/*// Game 3: Memory Puzzle
function game3() {
    // Add Memory Puzzle game code here
}*/
function game3() {
    const numbers = Array.from({ length: 16 }, (_, index) => index);
    const shuffledNumbers = shuffle(numbers);
    const container = document.getElementById('gameContainer');
    container.innerHTML = '';

    shuffledNumbers.forEach((number, index) => {
        const card = document.createElement('div');
        card.textContent = number;
        card.classList.add('card');
        card.dataset.index = index;
        card.addEventListener('click', handleCardClick);
        container.appendChild(card);
    });

    let selectedCards = [];
    let matchedPairs = 0;

    function handleCardClick() {
        if (selectedCards.length === 2) return;

        const clickedCard = this;
        if (selectedCards.includes(clickedCard)) return;

        selectedCards.push(clickedCard);
        clickedCard.classList.add('selected');

        if (selectedCards.length === 2) {
            const [card1, card2] = selectedCards;
            const index1 = Number(card1.dataset.index);
            const index2 = Number(card2.dataset.index);

            if (shuffledNumbers[index1] === shuffledNumbers[index2]) {
                matchedPairs++;
                if (matchedPairs === numbers.length / 2) {
                    alert('Congratulations! You won!');
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('selected');
                    card2.classList.remove('selected');
                }, 1000);
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}


/*// Game 4: Hangman
function game4() {
    // Add Hangman game code here
}*/
function game4() {
    const words = ['hangman', 'javascript', 'developer', 'openai', 'coding'];
    const word = words[Math.floor(Math.random() * words.length)];
    let hiddenWord = '_'.repeat(word.length);
    let remainingGuesses = 6;
    const guessedLetters = new Set();

    function displayWord() {
        const wordElement = document.createElement('div');
        wordElement.textContent = hiddenWord;
        wordElement.classList.add('hangman-word');
        document.getElementById('gameContainer').appendChild(wordElement);
    }

    function displayHangman() {
        const hangmanElement = document.createElement('div');
        hangmanElement.classList.add('hangman');
        hangmanElement.innerHTML = `
            <div class="head ${remainingGuesses < 6 ? 'show' : ''}"></div>
            <div class="body ${remainingGuesses < 5 ? 'show' : ''}"></div>
            <div class="left-arm ${remainingGuesses < 4 ? 'show' : ''}"></div>
            <div class="right-arm ${remainingGuesses < 3 ? 'show' : ''}"></div>
            <div class="left-leg ${remainingGuesses < 2 ? 'show' : ''}"></div>
            <div class="right-leg ${remainingGuesses < 1 ? 'show' : ''}"></div>
        `;
        document.getElementById('gameContainer').appendChild(hangmanElement);
    }

    function updateWord(letter) {
        let newHiddenWord = '';
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter || hiddenWord[i] === word[i]) {
                newHiddenWord += word[i];
            } else {
                newHiddenWord += '_';
            }
        }
        hiddenWord = newHiddenWord;
    }

    function checkGuess(letter) {
        if (!word.includes(letter)) {
            remainingGuesses--;
        }
        guessedLetters.add(letter);
        updateWord(letter);
        render();
        if (hiddenWord === word) {
            alert('Congratulations! You guessed the word correctly.');
        } else if (remainingGuesses === 0) {
            alert(`Game over! The word was "${word}".`);
        }
    }

    function render() {
        document.getElementById('gameContainer').innerHTML = '';
        displayWord();
        displayHangman();
        const guessedLettersElement = document.createElement('div');
        guessedLettersElement.textContent = `Guessed Letters: ${Array.from(guessedLetters).join(', ')}`;
        document.getElementById('gameContainer').appendChild(guessedLettersElement);
    }

    render();

    document.addEventListener('keydown', event => {
        const letter = event.key.toLowerCase();
        if (event.keyCode >= 65 && event.keyCode <= 90 && !guessedLetters.has(letter)) {
            checkGuess(letter);
        }
    });
}


/*// Game 5: Sudoku
function game5() {
    // Add Sudoku game code here
}*/
function game5() {
    const board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    function isValidMove(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function solveSudoku() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValidMove(row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku()) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solveSudoku();

    const container = document.getElementById('gameContainer');
    container.innerHTML = '';

    board.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('sudoku-row');

        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell === 0 ? '' : cell;
            cellElement.classList.add('sudoku-cell');
            rowElement.appendChild(cellElement);
        });

        container.appendChild(rowElement);
    });
}


// Function to start the selected game
function startGame(gameNumber) {
    document.getElementById('gameContainer').innerHTML = ''; // Clear previous game
    switch (gameNumber) {
        case 1:
            game1();
            break;
        case 2:
            game2();
            break;
        case 3:
            game3();
            break;
        case 4:
            game4();
            break;
        case 5:
            game5();
            break;
        default:
            alert("Invalid game selection!");
            break;
    }
}

