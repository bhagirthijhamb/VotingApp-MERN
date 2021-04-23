// when we are running on Heroku process.env.NODE_ENV is automatically set to 'production'
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
} else {
  // on local machine process.env.NODE_ENV will either not be defined or should not be equal to 'production'
  // so on local machine we will fall into this else case
  module.exports = require('./dev'); // require and export the dev keys at the same time
}