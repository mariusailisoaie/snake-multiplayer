const express = require('express');
const socket = require('socket.io');
const Snake = require('../public/snake');

const app = express();

app.use(express.static('../public'));

const PORT = 3000;
const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const io = socket(server);

io.on('connection', socket => {
  console.log('connection', socket.id);
  const snake = new Snake(
    [
      { x: 180, y: 200 },
      { x: 160, y: 200 },
      { x: 140, y: 200 },
    ],
    20,
    0,
  );

  setInterval(() => {
    snake.moveSnake();
    console.log(snake.dx_dy);
    io.emit('snake', snake.getSnakeParts());
  }, 1000);

  socket.on('changeDirection', data => {
    console.log('log: data', data);

    snake.dx_dy = { dx: data.dx, dy: data.dy };
  });
});