const db = require('../models');

exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find();

    res.status(200).json(polls);
  } catch(err) {
    err.status = 400;
    next(err); // send the error to the next function,the error handler in this case
  }
}