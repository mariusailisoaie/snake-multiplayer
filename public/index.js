const canvasBackgroundColor = '#e6f6ff';
const snakeColor = '#006442';
const borderColor = '#000';

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
}

const moveSnake = () => {
  const head = { x: snake.snakeParts[0].x + dx, y: snake.snakeParts[0].y + dy }

  ctx.fillStyle = '#00ab71';
  ctx.strokestyle = borderColor;
  ctx.fillRect(head.x - dx, head.y - dy, 20, 20);
  ctx.strokeRect(head.x - dx, head.y - dy, 20, 20);

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

  console.log('log: moveSnake -> head', head);
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
  }
});

// Initial canvas and snake drawing
paintCanvas();
drawSnake();

// Update snake position
const updateGame = () => {
  moveSnake();
  paintCanvas();
  drawSnake();

  setTimeout(() => {
    updateGame();
  }, 500);
}

// updateGame();