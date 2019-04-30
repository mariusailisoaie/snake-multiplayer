const express = require('express');
const socket = require('socket.io');
const Snake = require('./snake');
const fs = require('fs');

const app = express();

app.use(express.static('../public'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const io = socket(server);
let lobby = [];
const scoreTable = new Map();

let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 }

io.on('connection', socket => {
  console.log('connection', socket.id);

  const snake = new Snake(
    null,
    [
      { x: 180, y: 200 },
      { x: 160, y: 200 },
      { x: 140, y: 200 },
    ],
    20,
    0,
    socket.id,
    `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`,
    0
  );

  socket.on('username', username => {
    snake.setUsername = username;
  });

  lobby.push(snake);

  setInterval(() => {
    snake.moveSnake();

    if (snake.snakeParts[0].x === food.x && snake.snakeParts[0].y === food.y) {
      snake.snakeParts.push({ x: food.x, y: food.y });
      food.x = Math.floor(Math.random() * 20) * 20;
      food.y = Math.floor(Math.random() * 20) * 20;
      snake.score++;

      scoreTable.set(snake.username, snake.score);
      console.log(scoreTable.entries());

      // fs.writeFile('db.json', json, err => {
      //   if (err) throw err;
      // });
    }

    io.emit('snake', { lobby, food });
  }, 200);

  socket.on('changeDirection', data => {
    snake.dx_dy = { dx: data.dx, dy: data.dy };
  });

  socket.on('disconnect', () => {
    lobby = lobby.filter(snake => snake.id !== socket.id);
    console.log(`a snake left the game`);
  });
});