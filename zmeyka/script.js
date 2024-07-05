const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
const canvasWidth = 800;
const canvasHeight = 400;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let snake, direction, food, gameLoop, score;
let isPaused = false;

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
resumeButton.addEventListener('click', resumeGame);
upButton.addEventListener('click', () => changeDirection('up'));
downButton.addEventListener('click', () => changeDirection('down'));
leftButton.addEventListener('click', () => changeDirection('left'));
rightButton.addEventListener('click', () => changeDirection('right'));

document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp') changeDirection('up');
    else if (keyPressed === 'ArrowDown') changeDirection('down');
    else if (keyPressed === 'ArrowLeft') changeDirection('left');
    else if (keyPressed === 'ArrowRight') changeDirection('right');
});

function startGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: gridSize, y: 0 };
    food = { x: gridSize * 10, y: gridSize * 10 };
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    clearInterval(gameLoop);
    gameLoop = setInterval(gameLoopFunc, 100);
}

function pauseGame() {
    clearInterval(gameLoop);
    isPaused = true;
}

function resumeGame() {
    if (isPaused) {
        gameLoop = setInterval(gameLoopFunc, 100);
        isPaused = false;
    }
}

function changeDirection(dir) {
    switch (dir) {
        case 'up':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'down':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'left':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'right':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
        default:
            break;
    }
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize };
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (head.x < 0 || head.y < 0 || head.x >= canvasWidth || head.y >= canvasHeight || snakeCollision()) {
        clearInterval(gameLoop);
        alert('Game Over');
    }
}

function snakeCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function gameLoopFunc() {
    update();
    draw();
}
