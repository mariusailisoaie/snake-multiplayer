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
let lobby = [];

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
    socket.id
  );

  lobby.push(snake);

  setInterval(() => {
    snake.moveSnake();
    io.emit('snake', lobby);
  }, 500);

  socket.on('changeDirection', data => {
    snake.dx_dy = { dx: data.dx, dy: data.dy };
  });

  socket.on('disconnect', () => {
    lobby = lobby.filter(snake => snake.id !== socket.id);
    console.log(`a snake left the game`);
  });
});