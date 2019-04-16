const canvasBackgroundColor = '#e6f6ff';
const snakeColor = '#006442';
const borderColor = '#000';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const snake = new Snake(snakeParts);
snake.snakeParts.forEach(snakePart => console.log(snakePart));

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
}

paintCanvas();
drawSnake();