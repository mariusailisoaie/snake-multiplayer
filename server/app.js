const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.status(200).send('OK');
});

const PORT = 3000;
const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`server running on port ${PORT}`);
});