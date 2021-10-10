const mongoose = require("mongoose");

// const CubeModel = require("../models/cube.js");
// const AccessoryModel = require("../models/accessory.js");

module.exports = (url) => mongoose.connect(url);
