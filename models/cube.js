const mongoose = require("mongoose");

class Cube {
  constructor(info) {
    // this._id = uniqid();
    this.name = info.name;
    this.description = info.description;
    this.imageUrl = info.imageUrl;
    this.difficultyLevel = info.difficultyLevel;
  }

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

const cubeSchema = new mongoose.Schema({
  _name: String,
  _description: String,
  _imageUrl: String,
  _difficultyLevel: Number || String,
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _Accessories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accessory",
    },
  ],
});
cubeSchema.loadClass(Cube);
const CubeModel = mongoose.model("Cube", cubeSchema);

module.exports = CubeModel;
