const express = require('express');
const cors = require('cors'); 
// require('./models/User')
require('./services/passport');

const routes = require('./routes');

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
  res.send({ Hare : 'Krishna' });
})
app.use('/api/auth', routes.auth);

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

// authRoutes(app);
// require('./routes/auth')(app);

app.listen(PORT, console.log(`Server started on port ${PORT}`))

// With no npm script in package.json - nodemon
// with "start": "nodemon" - npm run start

// https://accounts.google.com/signin/oauth/error?authError=ChVyZWRpcmVjdF91cmlfbWlzbWF0Y2gS1QJUaGUgcmVkaXJlY3QgVVJJIGluIHRoZSByZXF1ZXN0LCBodHRwOi8vbG9jYWxob3N0OjUwMDAvYXV0aC9nb29nbGUvY2FsbGJhY2ssIGRvZXMgbm90IG1hdGNoIHRoZSBvbmVzIGF1dGhvcml6ZWQgZm9yIHRoZSBPQXV0aCBjbGllbnQuIFRvIHVwZGF0ZSB0aGUgYXV0aG9yaXplZCByZWRpcmVjdCBVUklzLCB2aXNpdDogaHR0cHM6Ly9jb25zb2xlLmRldmVsb3BlcnMuZ29vZ2xlLmNvbS9hcGlzL2NyZWRlbnRpYWxzL29hdXRoY2xpZW50LzI4MTc2NDYzMTM1MC00ZmpkNjJoMDVvdTFnZ2FsMTRjOXBxczlnOW10OTAxbC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbT9wcm9qZWN0PTI4MTc2NDYzMTM1MBpFaHR0cDovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hY2NvdW50cy9kb2NzL09BdXRoMkxvZ2luI3NldHJlZGlyZWN0dXJpIJAD&client_id=281764631350-4fjd62h05ou1ggal14c9pqs9g9mt901l.apps.googleusercontent.com