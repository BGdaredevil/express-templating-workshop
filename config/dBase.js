const mongoose = require("mongoose");

const CubeClass = require("../models/cube.js");

module.exports = (url) => {
  return mongoose.connect(url)
};
