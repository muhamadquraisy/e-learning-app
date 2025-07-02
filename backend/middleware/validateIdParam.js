const mongoose = require('mongoose');

module.exports = (paramName) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return res.status(400).json({ message: `ID ${paramName} tidak valid` });
  }
  next();
};