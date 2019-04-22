class Snake {
  constructor(snakeParts, dx, dy) {
    this.snakeParts = snakeParts;
    this.dx = dx;
    this.dy = dy;
  }

  moveSnake(dx = this.dx, dy = this.dy) {
    const head = { x: this.snakeParts[0].x + dx, y: this.snakeParts[0].y + dy }

    this.snakeParts.unshift(head);
    this.snakeParts.pop();

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
    // if (head.x === initialFoodX && head.y === initialFoodY) {
    //   initialFoodX = Math.floor(Math.random() * 20) * 20;
    //   initialFoodY = Math.floor(Math.random() * 20) * 20;
    // }
  }

  getSnakeParts() {
    return this.snakeParts;
  }

  get dx_dy() {
    return { dx: this.dx, dy: this.dy }
  }

  set dx_dy({ dx, dy }) {
    this.dx = dx;
    this.dy = dy;
  }
}

module.exports = Snake;