const mongoose = require("mongoose");

const CubeModel = require("../models/cube.js");

module.exports = {
  connectDb: (url) => {
    return mongoose.connect(url)
  },
  models: {CubeModel}
}
