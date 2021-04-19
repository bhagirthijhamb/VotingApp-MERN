const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./models');
const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 5000;

// cors and body-parser are just express middlewares, so when we use them, we initialiase them
app.use(cors());
app.use(bodyParser.json()); // we need to parse just the json data.

// app object represents the underlying running express server
// the express sserver has some route handlers associated with it
// app.get() creates a brand new route handler
app.get('/', (req, res, next) => {
  // res.send('hello world');
  // frontend would expect certai type of data - json objects
  res.send({ hello: 'world' });
})

// Almost all the express methods like get, use expect an middleware function (the second argument to app.get() below);
// app.use((req, res, next) => {
//   const err = new Error('Not found');
//   err.status = 404;
  
//   next(err);
// })
app.use(handle.notFound);


// 404 (Not Found) Error
// Middleware (technically an Afterware as it runs after every other request). 
// Its the final endpoint that the express will hit before server crashes.
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     err: err.message || "Something went wrong"
//   })
// })
app.use(handle.errors);



app.listen(PORT, console.log(`Server started on port ${PORT}`))

// With no npm script in package.json - nodemon
// with "start": "nodemon" - npm run start


// extra comment