const jwt = require('jsonwebtoken');

const db = require('./../models');

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({ id, username }, process.env.SECRET)
    // res.json(user);
    // send status with each response
    res.status(201).json({ id, username, token })
  } catch(err){
    if(err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if(valid){
      const token = jwt.sign({ id, username }, process.env.SECRET)

      res.json({ id, username, token });
    } else {
      // for security purpose if anything goes wrong here in the login
      // we dont want the user to know what exactly went wrong
      // so we throw a generic error here
      // so whatever error happens, it will have the same message here
        // throw new Error('Invalid Username/Password');
        throw new Error();

    }
  } catch(err){
    // console.log(err);
    err.message = 'Invalid Username/Password';
    next(err)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    res.send(req.user);
  } catch(err){
    console.log(err);
    next(err);
  }
}