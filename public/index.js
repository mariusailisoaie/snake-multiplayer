const canvasBackgroundColor = '#e6f6ff';
const snakeColor = '#006442';
const headColor = '#00ab71';
const borderColor = '#000';
const foodColor = '#513814';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let dx = 20, dy = 0;

const snake = new Snake();

const paintCanvas = () => {
  ctx.fillStyle = canvasBackgroundColor;
  ctx.strokestyle = borderColor;
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

const drawSnake = () => {
  ctx.fillStyle = snakeColor;
  snake.snakeParts.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
  });

  ctx.fillStyle = headColor;
  ctx.fillRect(snake.snakeParts[0].x, snake.snakeParts[0].y, 20, 20);
  ctx.strokeRect(snake.snakeParts[0].x, snake.snakeParts[0].y, 20, 20);
}

let initialFoodX = Math.floor(Math.random() * 20) * 20;
let initialFoodY = Math.floor(Math.random() * 20) * 20;

const drawFood = (foodX = initialFoodX, foodY = initialFoodY) => {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, 20, 20);
}

const moveSnake = () => {
  const head = { x: snake.snakeParts[0].x + dx, y: snake.snakeParts[0].y + dy }

  snake.snakeParts.unshift(head);
  snake.snakeParts.pop();

  if (head.x === 400) {
    head.x = 0;
  } else if (head.x === -20) {
    head.x = 380;
  } else if (head.y === 400) {
    head.y = 0;
  } else if (head.y === -20) {
    head.y = 380;
  }

  // Snake ate food logic
  if (head.x === initialFoodX && head.y === initialFoodY) {
    initialFoodX = Math.floor(Math.random() * 20) * 20;
    initialFoodY = Math.floor(Math.random() * 20) * 20;
  }

  // console.log('log: moveSnake -> head', head);
}

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
    moveSnake();
    paintCanvas();
    drawSnake();
    drawFood();
  }
});

// Initial canvas, snake and food drawing
paintCanvas();
drawSnake();

// Update snake position
const updateGame = () => {
  moveSnake();
  paintCanvas();
  drawSnake();
  drawFood();

  setTimeout(() => {
    updateGame();
  }, 100);
}

updateGame();