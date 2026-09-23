const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;

const BoardBackground = "white";
const snakeColor = "yellow";
const snakeBorder = "black";
const foodColor = "red";

let running = true, score = 0, foodX, foodY;
let xVelocity = unitSize, yVelocity = 0;

let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

createFood();
gameLoop();

function gameLoop() {
    if (!running) return displayGameOver();

    setTimeout(() => {
        clearBoard();
        moveSnake();
        drawFood();
        drawSnake();
        checkGameOver();
        gameLoop();
    }, 75);
}

function clearBoard() {
    ctx.fillStyle = BoardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    const random = max =>
        Math.round(Math.random() * (max - unitSize) / unitSize) * unitSize;

    foodX = random(gameWidth);
    foodY = random(gameHeight);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };

    snake.unshift(head);

    if (head.x == foodX && head.y == foodY) {
        score++;
        scoreText.textContent = score;
        createFood();
    } else snake.pop();
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const key = event.keyCode;

    if (key == 37 && xVelocity != unitSize)
        xVelocity = -unitSize, yVelocity = 0;

    else if (key == 38 && yVelocity != unitSize)
        xVelocity = 0, yVelocity = -unitSize;

    else if (key == 39 && xVelocity != -unitSize)
        xVelocity = unitSize, yVelocity = 0;

    else if (key == 40 && yVelocity != -unitSize)
        xVelocity = 0, yVelocity = unitSize;
}

function checkGameOver() {
    const head = snake[0];

    if (
        head.x < 0 || head.x >= gameWidth ||
        head.y < 0 || head.y >= gameHeight ||
        snake.slice(1).some(part => part.x == head.x && part.y == head.y)
    ) running = false;
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!", gameWidth / 2, gameHeight / 2);
}

function resetGame() {
    score = 0;
    scoreText.textContent = score;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];

    running = true;
    createFood();
    gameLoop();
}