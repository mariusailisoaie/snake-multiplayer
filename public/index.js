const socket = io.connect('http://localhost:3000');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let dx = 20, dy = 0;

const snakeParts = [
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
];

const snake = new Snake(snakeParts);

const paintCanvas = () => {
  ctx.fillStyle = canvasBackgroundColor;
  ctx.strokestyle = borderColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

let initialFoodX = Math.floor(Math.random() * 20) * 20;
let initialFoodY = Math.floor(Math.random() * 20) * 20;

const drawFood = (foodX = initialFoodX, foodY = initialFoodY) => {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, 20, 20);
}

// Change snake direction using arrow keys 
document.addEventListener('keydown', e => {
  if (e.code.toLowerCase() === 'arrowup') {
    dx = 0;
    dy = -20;
  } else if (e.code.toLowerCase() === 'arrowdown') {
    dx = 0;
    dy = 20;
  } else if (e.code.toLowerCase() === 'arrowleft') {
    dx = -20;
    dy = 0;
  } else if (e.code.toLowerCase() === 'arrowright') {
    dx = 20;
    dy = 0;
  } else if (e.key === 'q') {
    snake.moveSnake();
    paintCanvas();
    snake.drawSnake();
    drawFood();
  }
});
const snakeCoordinates = document.getElementById('snakeCoordinates');
const enemyCoordinates = document.getElementById('enemyCoordinates');

// Initial canvas, snake and food drawing
paintCanvas();
// snake.drawSnake();

// Update snake position
const updateGame = () => {
  // Emit message to the server
  socket.emit('snake', snake.snakeParts);

  snake.moveSnake();
  paintCanvas();
  snake.drawSnake();
  // drawFood();

  setTimeout(() => {
    updateGame();
  }, 1000);
}

socket.on('snake', snakeData => {
  paintCanvas();

  ctx.fillStyle = 'red';
  snakeData.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y + 20, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y + 20, 20, 20);
  });

  snake.drawSnake();

  console.log(snake.snakeParts[0].x, snake.snakeParts[0].y);
  snakeCoordinates.innerHTML = `Snake: ${snake.snakeParts[0].x} x ${snake.snakeParts[0].y}`
  enemyCoordinates.innerHTML = `Enemy: ${snakeData[0].x} x ${snakeData[0].y}`
});

updateGame();