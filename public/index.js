const canvasBackgroundColor = '#e6f6ff';
const borderColor = '#000';
const foodColor = '#513814';
const snakeColor = '#006442';
const headColor = '#00ab71';
const playerList = document.getElementById('player-list');
const score = document.getElementById('score');
const playBtn = document.getElementById('play-btn');
const username = document.getElementById('username');
let snakeDirectionX = null, snakeDirectionY = null;

const startGame = () => {
  const socket = io();

  socket.emit('username', username.value);

  socket.on('snake', ({ lobby, food }) => {
    paintCanvas();
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, 20, 20);

    playerList.innerHTML = '';
    lobby.forEach(snake => {
      snakeDirectionX = snake.dx;
      snakeDirectionY = snake.dy;

      let li = document.createElement('li');
      li.innerText = `${snake.username} / Score: ${snake.score}`;
      playerList.appendChild(li);

      snake.snakeParts.forEach(snakePart => {
        ctx.fillStyle = `rgba(${snake.color}, .7)`;
        ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
      });

      ctx.fillStyle = `rgba(${snake.color}, 1)`;
      ctx.fillRect(snake.snakeParts[0].x, snake.snakeParts[0].y, 20, 20);
    });
  });

  socket.on('connectedPlayer', connectedPlayers => {
    playerList.innerHTML = '';

    connectedPlayers.forEach(player => {
      let li = document.createElement('li');
      li.innerText = `Player ${player}`;
      playerList.appendChild(li);
    });
  });

  // Change snake direction using arrow keys 
  document.addEventListener('keydown', e => {
    if (e.code.toLowerCase() === 'arrowup' && snakeDirectionY !== 20) {
      let dx = 0;
      let dy = -20;
      socket.emit('changeDirection', { dx, dy });
    } else if (e.code.toLowerCase() === 'arrowdown' && snakeDirectionY !== -20) {
      let dx = 0;
      let dy = 20;
      socket.emit('changeDirection', { dx, dy });
    } else if (e.code.toLowerCase() === 'arrowleft' && snakeDirectionX !== 20) {
      let dx = -20;
      let dy = 0;
      socket.emit('changeDirection', { dx, dy });
    } else if (e.code.toLowerCase() === 'arrowright' && snakeDirectionX !== -20) {
      let dx = 20;
      let dy = 0;
      socket.emit('changeDirection', { dx, dy });
    }
  });
}

username.addEventListener('keyup', e => {
  e.preventDefault();
  if (e.keyCode === 13) {
    playBtn.click();
    username.value = '';
  }
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