const uniqid = require("uniqid");
const mongoose = require("mongoose");

// const db = require("../controllers/db.js");

class Cube {
  // constructor(info) {
  //   this._id = uniqid();
  //   this.name = info.name;
  //   this.description = info.description;
  //   this.imageUrl = info.imageUrl;
  //   this.difficultyLevel = info.difficultyLevel;
  // }

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

function cc(info) {
  // this._id = uniqid();
  this.name = info.name;
  this.description = info.description;
  this.imageUrl = info.imageUrl;
  this.difficultyLevel = info.difficultyLevel;
}

const cubeSchema = new mongoose.Schema({
  // _id: String,
  _name: String,
  _description: String,
  _imageUrl: String,
  _difficultyLevel: Number || String,
});
cubeSchema.loadClass(Cube);
const CubeModel = mongoose.model("Cube", cubeSchema);

// CubeModel.create({ name: "ivo" }).then((r) => console.log(r._name));

// console.log(CubeModel.prototype.schema);

// CubeModel.find({})
//   // .lean()
//   .then((r) => console.log(r[r.length - 1].name));

// // let newSch = new mongoose.Schema({
// //   name: String,
// // });
// // let mod = mongoose.model("a", newSch);

// // mod.create({ name: "ivo" }).then((r) => console.log(r));

module.exports = CubeModel;
