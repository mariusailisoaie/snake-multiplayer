const canvasBackgroundColor = '#e6f6ff';
const borderColor = '#000';
const foodColor = '#513814';
const snakeColor = '#006442';
const headColor = '#00ab71';

const socket = io.connect('http://localhost:3000');

socket.on('snake', lobby => {
  paintCanvas();

  lobby.forEach(snake => {
    snake.snakeParts.forEach(snakePart => {
      ctx.fillStyle = `rgba(${snake.color}, .7)`;
      ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    });

    ctx.fillStyle = `rgba(${snake.color}, 1)`;
    ctx.fillRect(snake.snakeParts[0].x, snake.snakeParts[0].y, 20, 20);
  });
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const paintCanvas = () => {
  ctx.fillStyle = canvasBackgroundColor;
  ctx.strokestyle = borderColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Initial canvas drawing
paintCanvas();

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