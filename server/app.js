const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('../public'));

const PORT = 3000;
const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const io = socket(server);

io.on('connection', socket => {
  console.log('connection made', socket.id);
});