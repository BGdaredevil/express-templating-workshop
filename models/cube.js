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
  _name: {type: String, minlength: 5, validate: /[a-z\s0-9]+/gi, trim: true},
  _description: {type: String, minlength: 20, validate: /[a-z\s0-9]+/gi, trim: true},
  _imageUrl: {type: String, validate: /^https?:\/{2}/, trim: true},
  _difficultyLevel: Number || String,
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
