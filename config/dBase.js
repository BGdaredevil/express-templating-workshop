const mongoose = require("mongoose");

const CubeModel = require("../models/cube.js");
const AccessoryModel = require("../models/accessory.js");

module.exports = {
  connectDb: (url) => {
    return mongoose.connect(url, { user: "root", pass: "root" });
  },
  models: { CubeModel, AccessoryModel },
};
