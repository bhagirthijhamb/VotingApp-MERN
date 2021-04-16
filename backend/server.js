const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res, next) => {
  // res.send('hello world');
  // frontend would expect certai type of data - json objects
  res.send({ hello: 'world' });
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))