const express = require('express');

const app = express();
const PORT = 5000;


app.get('/', (req, res, next) => {
  // res.send('hello world');
  // frontend would expect certai type of data - json objects
  res.send({ hello: 'world' });
})

// 404 (Not Found) Error
// Almost all the express methods like get, use expect an middleware function (the second argument to app.get() below);
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;

  next(err);
})

// Middleware (technically an Afterware as it runs after every other request). 
// Its the final endpoint that the express will hit before server crashes.
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    err: err.message || "Something went wrong"
  })
})


app.listen(PORT, console.log(`Server started on port ${PORT}`))