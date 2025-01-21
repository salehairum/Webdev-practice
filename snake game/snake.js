const rows = 21;
const cols = 20;
let snakeLength = 5;   //length of snake at the start
let snake = [[Math.floor(rows / 2), snakeLength]];
let prevSnake = JSON.parse(JSON.stringify(snake));  //this is added to remove previous snake when i render a new one(as the position changes)
let gameEnd = false;
let currentDirection = 'right';
let foodPos = [Math.floor(rows / 2), 15];

initGame();

function initGame() {
    createBoard();
    initSnakeBody();
    //while (!gameEnd) {

    const box = document.querySelector(`[data-row="${foodPos[0]}"][data-col="${foodPos[1]}"]`);
    box.classList.add('apple');
    setInterval(drawSnake, 250);
    //}
}

function createBoard() {
    let k = 0;
    const board = document.querySelector('.game-container');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < cols; j++, k++) {
            const box = document.createElement('div');
            box.setAttribute('data-row', i);
            box.setAttribute('data-col', j);
            if (k % 2 === 0)
                box.classList.add('boxLight');
            else
                box.classList.add('boxDark');
            row.appendChild(box);
        }
        k++;
        board.appendChild(row);
    }
}

function initSnakeBody() {
    for (let i = snakeLength - 1; i >= 1; i--) {
        snake.push([Math.floor(rows / 2), i]);
    }
    prevSnake = JSON.parse(JSON.stringify(snake));
}

function drawSnake() {
    for (let i = 0; i < prevSnake.length; i++) {
        const box = document.querySelector(`[data-row="${prevSnake[i][0]}"][data-col="${prevSnake[i][1]}"]`);
        let row = box.getAttribute('data-row');
        let col = box.getAttribute('data-col');

        box.classList.remove('snakeHead');
        box.classList.remove('snakeBody');

        if (prevSnake[i][0] % 2 === 0) {
            if (prevSnake[i][1] % 2 === 0)
                box.classList.add('boxLight');
            else
                box.classList.add('boxDark');
        }
        else {
            if (prevSnake[i][1] % 2 === 0)
                box.classList.add('boxDark');
            else
                box.classList.add('boxLight');
        }
    }

    for (let i = 0; i < snake.length; i++) {
        const box = document.querySelector(`[data-row="${snake[i][0]}"][data-col="${snake[i][1]}"]`);
        let row = box.getAttribute('data-row');
        let col = box.getAttribute('data-col');
        if (i == 0)
            box.classList.add('snakeHead');
        else
            box.classList.add('snakeBody');

        box.classList.remove('boxDark');
        box.classList.remove('boxLight');
    }

    prevSnake = JSON.parse(JSON.stringify(snake))
    // for (i = 0; i < snake.length; i++) {
    //     snake[i][1] = snake[i][1] + 1;   //update directions
    // }
}

document.addEventListener('keydown', (e) => {
    console.log(prevSnake);
    if (e.key == 'ArrowUp') {
        for (i = 0; i < snakeLength; i++) {
            snake[i][0] = snake[i][0] - 1;
        }
    }
    else if (e.key == 'ArrowDown') {
        for (i = 0; i < snakeLength; i++) {
            snake[i][0] = snake[i][0] + 1;
        }
    }
    else if (e.key == 'ArrowLeft') {
        for (i = 0; i < snakeLength; i++) {
            snake[i][1] = snake[i][1] - 1;
        }
    }
    else if (e.key == 'ArrowRight') {
        for (i = 0; i < snakeLength; i++) {
            snake[i][1] = snake[i][1] + 1;
        }
    }
});
