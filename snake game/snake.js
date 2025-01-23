const rows = 21;
const cols = 20;
let snakeLength = 3;   //length of snake at the start
let snake = [[Math.floor(rows / 2), snakeLength]];
let prevSnake = JSON.parse(JSON.stringify(snake));  //this is added to remove previous snake when i render a new one(as the position changes)
let gameEnd = false;
let currentDirection = 'r';
let foodPos = [Math.floor(rows / 2), 15];
let direction = ['r'];
let score = 0;

const moveSound = new Audio('move.wav');
const deathSound = new Audio('gameOver.wav');
const eatSound = new Audio('eat.wav');

const startButton = document.getElementById('startGame');

startButton.addEventListener('click', function () {
    initGame();
    startButton.style.display = 'none';
})

function initGame() {
    preloadSounds();
    createBoard();
    initSnakeBodyWithDirection();
    const box = document.querySelector(`[data-row="${foodPos[0]}"][data-col="${foodPos[1]}"]`);
    box.classList.add('apple');

    setInterval(gameFlow, 100);
}

function resetGame() {
    removeOldSnake();

    //remove the food
    let box = document.querySelector(`[data-row="${foodPos[0]}"][data-col="${foodPos[1]}"]`);
    box.classList.remove('apple');

    snakeLength = 3;   //length of snake at the start
    snake = [[Math.floor(rows / 2), snakeLength]];
    prevSnake = JSON.parse(JSON.stringify(snake));  //this is added to remove previous snake when i render a new one(as the position changes)
    gameEnd = false;
    currentDirection = 'r';
    foodPos = [Math.floor(rows / 2), 15];
    direction = ['r'];
    score = 0;

    let scoreElement = document.querySelector(".score");
    scoreElement.textContent = "Score: " + score;

    initSnakeBodyWithDirection();
    box = document.querySelector(`[data-row="${foodPos[0]}"][data-col="${foodPos[1]}"]`);
    box.classList.add('apple');
}

function preloadSounds() {
    moveSound.load();
    deathSound.load();
    eatSound.load();
}

function gameFlow() {
    if (!gameEnd) {
        removeOldSnake();
        drawSnake();
        checkFoodCollision();
        changeBodyPosition();
        updateDirection();
    }
    else {

        let gameResult = document.querySelector(".overlay");
        let gameResultText = document.querySelector(".gameResultText");
        gameResultText.textContent = "Your score is " + score + "!";
        gameResult.style.display = "block";
    }
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

function initSnakeBodyWithDirection() {
    for (let i = snakeLength - 1; i >= 1; i--) {
        snake.push([Math.floor(rows / 2), i]);
        direction.push('r');
    }
    prevSnake = JSON.parse(JSON.stringify(snake));
}

function removeOldSnake() {
    for (let i = 0; i < prevSnake.length; i++) {
        const box = document.querySelector(`[data-row="${prevSnake[i][0]}"][data-col="${prevSnake[i][1]}"]`);
        let row = box.getAttribute('data-row');
        let col = box.getAttribute('data-col');

        box.classList.remove('snakeHead');
        box.classList.remove('snakeBody');
        box.style.transform = '';

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
}

function drawSnake() {

    for (let i = 0; i < snakeLength; i++) {
        const box = document.querySelector(`[data-row="${snake[i][0]}"][data-col="${snake[i][1]}"]`);
        let row = box.getAttribute('data-row');
        let col = box.getAttribute('data-col');
        if (i == 0) {
            box.classList.add('snakeHead');
            changeHeadDirection();
        }
        else
            box.classList.add('snakeBody');

        box.classList.remove('boxDark');
        box.classList.remove('boxLight');
    }

    prevSnake = JSON.parse(JSON.stringify(snake))
}

function checkFoodCollision() {
    if (snake[0][0] == foodPos[0] && snake[0][1] == foodPos[1]) {
        addToTail();

        score++;

        eatSound.currentTime = 0;
        eatSound.play();

        let scoreElement = document.querySelector(".score");
        scoreElement.textContent = "Score: " + score;

        let box = document.querySelector(`[data-row="${foodPos[0]}"][data-col="${foodPos[1]}"]`);
        box.classList.remove('apple');

        let newFoodPosAssigned = false;
        while (!newFoodPosAssigned) {
            let newFoodPos = [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)];

            // Check food position is not on snake body
            let onSnake = false;
            for (let i = 0; i < snake.length; i++) {
                if (newFoodPos[0] === snake[i][0] && newFoodPos[1] === snake[i][1]) {
                    onSnake = true;
                    break;
                }
            }
            if (onSnake) {
                newFoodPosAssigned = false;
                continue;
            }
            else if (newFoodPos[0] != foodPos[0] && newFoodPos[1] != foodPos[1]) {
                newFoodPosAssigned = true;
                foodPos = newFoodPos;
            }
        }

        box = document.querySelector(`[data-row="${foodPos[0]}"][data-col="${foodPos[1]}"]`);
        box.classList.add('apple');
    }
}

function checkBoundaryCollision() {
    if (snake[0][0] >= rows || snake[0][1] >= cols || snake[0][0] < 0 || snake[0][1] < 0) {
        gameEnd = true;
        deathSound.currentTime = 0;
        deathSound.play();
    }
}

function checkSelfCollision() {
    for (let i = 1; i < snakeLength; i++) {
        if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]) {
            gameEnd = true;
            deathSound.currentTime = 0;
            deathSound.play();
        }
    }
}

function updateDirection() {
    for (let i = snakeLength - 1; i >= 1; i--) {
        if (direction[i] !== direction[i - 1]) {
            direction[i] = direction[i - 1];
        }
    }
}

function changeBodyPosition() {
    for (let i = 0; i < snakeLength; i++) {
        if (direction[i] === 'r')
            snake[i][1]++;
        else if (direction[i] === 'l')
            snake[i][1]--;
        else if (direction[i] === 'u')
            snake[i][0]--;
        else if (direction[i] === 'd')
            snake[i][0]++;
    }

    checkBoundaryCollision();
    checkSelfCollision();
}

function changeHeadDirection() {
    const snakeHead = document.querySelector('.snakeHead');
    if (direction[0] === 'r')
        snakeHead.style.transform = 'rotate(0deg)';
    else if (direction[0] === 'l')
        snakeHead.style.transform = 'rotate(180deg)';
    else if (direction[0] === 'u')
        snakeHead.style.transform = 'rotate(270deg)';
    else if (direction[0] === 'd')
        snakeHead.style.transform = 'rotate(90deg)';
}

function addToTail() {
    let lastIndex = snakeLength - 1;
    let dir = direction[lastIndex];
    direction.push(dir);

    if (dir === 'u')
        snake.push([snake[lastIndex][0] + 1, snake[lastIndex][1]]);
    else if (dir === 'd')
        snake.push([snake[lastIndex][0] - 1, snake[lastIndex][1]]);
    else if (dir === 'l')
        snake.push([snake[lastIndex][0], snake[lastIndex][1] + 1]);
    else if (dir === 'r')
        snake.push([snake[lastIndex][0], snake[lastIndex][1] - 1]);

    snakeLength++;

}
document.addEventListener('keydown', (e) => {
    let oldDirection = currentDirection;  // Store the previous direction

    if (e.key === 'ArrowUp' && currentDirection !== 'd') {
        currentDirection = 'u';
    }
    else if (e.key === 'ArrowDown' && currentDirection !== 'u') {
        currentDirection = 'd';
    }
    else if (e.key === 'ArrowLeft' && currentDirection !== 'r') {
        currentDirection = 'l';
    }
    else if (e.key === 'ArrowRight' && currentDirection !== 'l') {
        currentDirection = 'r';
    }

    // Only play sound if direction actually changed
    if (oldDirection !== currentDirection) {
        moveSound.currentTime = 0; // Reset the sound to the start
        moveSound.play();
    }

    direction[0] = currentDirection;
    changeHeadDirection();
});

let closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function () {
    let gameResult = document.querySelector(".overlay");
    gameResult.style.display = "none";

    resetGame();
});