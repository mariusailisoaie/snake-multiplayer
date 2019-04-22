const canvasBackgroundColor = '#e6f6ff';
const snakeColor = '#006442';
const headColor = '#00ab71';
const borderColor = '#000';
const foodColor = '#513814';

class Snake {
  constructor(snakeParts) {
    this.snakeParts = snakeParts;
  }

  drawSnake = () => {
    ctx.fillStyle = snakeColor;
    this.snakeParts.forEach(snakePart => {
      ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
      ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
    });

    ctx.fillStyle = headColor;
    ctx.fillRect(this.snakeParts[0].x, this.snakeParts[0].y, 20, 20);
    ctx.strokeRect(this.snakeParts[0].x, this.snakeParts[0].y, 20, 20);
  }

  moveSnake = () => {
    const head = { x: this.snakeParts[0].x + dx, y: this.snakeParts[0].y + dy }

    this.snakeParts.unshift(head);
    this.snakeParts.pop();

    // Emit message to the server
    socket.emit('snake', this.snakeParts);

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
  }
}