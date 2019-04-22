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
    socket.emit('snake', snake.snakeParts);
  }
});
const snakeCoordinates = document.getElementById('snakeCoordinates');
const enemyCoordinates = document.getElementById('enemyCoordinates');

// Initial canvas, snake and food drawing
paintCanvas();
snake.drawSnake();

// Emit message to the server
socket.emit('snake', snake.snakeParts);

socket.on('snake', snakeArray => {
  paintCanvas();
  snake.drawSnake();

  snakeArray.forEach(snakePart => {
    ctx.fillStyle = 'red';
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
  });

  snakeCoordinates.innerHTML = `Snake: ${snake.snakeParts[0].x} x ${snake.snakeParts[0].y}`
  enemyCoordinates.innerHTML = `Enemy: ${snakeArray[0].x} x ${snakeArray[0].y}`
});

const update = () => {
  snake.moveSnake();
  paintCanvas();
  snake.drawSnake();
  socket.emit('snake', snake.snakeParts);

  setTimeout(() => {
    update();
  }, 1000);
}

// update();