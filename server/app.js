const express = require('express');

const app = express();

app.use(express.static('public'));

const PORT = 3000;
const server = app.listen(PORT || process.env.PORT, () => {
  console.log(`server running on port ${PORT}`);
});