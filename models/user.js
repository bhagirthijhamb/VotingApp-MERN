const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  googleId: String,
  created: { type: Date, default: Date.now },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}]
})

// not using arrow function here, using function keyword here
// Just because of how arrow functions work
// If you attach funcion to an object, the this keyword won't properly bind unless u use the function keyword.
// Otherwise you'll have the global scope and this will refer to the machine instead of the object.
userSchema.pre('save', async function(next) {
  // all async await funtions need to be inside the try catch block
  try {
    if(!this.isModified('password')){
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch(err){
    // if there is an error, we send it to the next() funciton
    return next(err);
  }
})

userSchema.methods.comparePassword = async function(attempt, next){
  try {
    // returns a boolean
    return await bcrypt.compare(attempt, this.password);
  } catch(err){
    console.log(err)
    next(err);
  }
}

module.exports = mongoose.model('User', userSchema);