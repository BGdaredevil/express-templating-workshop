const mongoose = require("mongoose");

const CubeModel = require("../models/cube.js");
const AccessoryModel = require("../models/accessory.js");

module.exports = {
  connectDb: (url) => {
    // return mongoose.connect(url, {
    //   auth: { authSource: "admin" },
    //   user: "root",
    //   pass: "root",
    //   useMongoClient: true,
    // });
    return mongoose.connect(url);
  },
  models: { CubeModel, AccessoryModel },
};
