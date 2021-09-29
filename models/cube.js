const uniqid = require("uniqid");
const mongoose = require("mongoose")


// const db = require("../controllers/db.js");

class Cube {
  constructor(info) {
    this._id = uniqid();
    this.name = info.name;
    this.description = info.description;
    this.imageUrl = info.imageUrl;
    this.difficultyLevel = info.difficultyLevel;
  }

  // static save(cube) {
  //   return db.addCube(cube);
  // }

  set name(str) {
    if (str.trim() == "") {
      throw new Error("Invalid Name");
    }

    this._name = str;
  }

  set description(str) {
    if (str.trim() == "") {
      throw new Error("Invalid description");
    }

    this._description = str;
  }

  set imageUrl(str) {
    if (str.trim() == "") {
      throw new Error("Invalid imageUrl");
    }

    this._imageUrl = str;
  }

  set difficultyLevel(num) {
    if (isNaN(num)) {
      throw new Error("Invalid difficulty");
    }

    this._difficultyLevel = Number(num);
  }
}

const cubeSchema = new mongoose.Schema().loadClass(Cube);
const CubeModel = mongoose.model('Cube', cubeSchema);


module.exports = CubeModel;
