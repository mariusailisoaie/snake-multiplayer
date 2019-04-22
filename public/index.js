const canvasBackgroundColor = '#e6f6ff';
const borderColor = '#000';
const foodColor = '#513814';
const snakeColor = '#006442';
const headColor = '#00ab71';

const socket = io.connect('http://localhost:3000');

socket.on('snake', snakeData => {
  console.log('log: snakeData', snakeData[0]);
  paintCanvas();
  drawFood();

  ctx.fillStyle = snakeColor;
  snakeData.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
  });

  ctx.fillStyle = headColor;
  ctx.fillRect(snakeData[0].x, snakeData[0].y, 20, 20);
  ctx.strokeRect(snakeData[0].x, snakeData[0].y, 20, 20);
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

// Initial canvas, snake and food drawing
paintCanvas();
drawFood();

// Change snake direction using arrow keys 
document.addEventListener('keydown', e => {
  if (e.code.toLowerCase() === 'arrowup') {
    dx = 0;
    dy = -20;
    socket.emit('changeDirection', { dx, dy });
  } else if (e.code.toLowerCase() === 'arrowdown') {
    dx = 0;
    dy = 20;
    socket.emit('changeDirection', { dx, dy });
  } else if (e.code.toLowerCase() === 'arrowleft') {
    dx = -20;
    dy = 0;
    socket.emit('changeDirection', { dx, dy });
  } else if (e.code.toLowerCase() === 'arrowright') {
    dx = 20;
    dy = 0;
    socket.emit('changeDirection', { dx, dy });
  } else if (e.key === 'q') {
    console.log('q');
  }
});

// const snakeCoordinates = document.getElementById('snakeCoordinates');
// const enemyCoordinates = document.getElementById('enemyCoordinates');