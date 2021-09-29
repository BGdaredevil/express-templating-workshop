const mongoose = require("mongoose");

const CubeClass = require("../models/cube.js");

module.exports = (url) => {
  return mongoose.connect(url).then(() => {
    const cubeSchema = new mongoose.Schema().loadClass(CubeClass);
    const Cube = mongoose.model('Cube', cubeSchema);
  });
};
