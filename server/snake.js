class Snake {
  constructor(username, snakeParts, dx, dy, id, color, score) {
    this.username = username;
    this.snakeParts = snakeParts;
    this.dx = dx;
    this.dy = dy;
    this.id = id;
    this.color = color;
    this.score = score;
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

  get getUsername() {
    return this.username;
  }

  set setUsername(username) {
    this.username = username;
  }
}

module.exports = Snake;