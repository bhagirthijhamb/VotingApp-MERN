const mongoose = require('mongoose');

// This will logout every transaction inside the database
// so that we can see whats going on without testing it through the api
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/votingApp');
// mongoose.connect(`${process.env.DATABASE}`);

// This allows us to use the db variable inside our application
// as db.User and  as db.Poll
module.exports.User = require('./User');
module.exports.Poll = require('./Poll');