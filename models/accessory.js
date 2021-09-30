const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  _name: { type: String, required: true, trim: true },
  _description: { type: String, required: true, maxlength: 10, trim: true },
  _imageUrl: { type: String, required: true, trim: true },
  _difficultyLevel: { type: String || Number, required: true, trim: true },
  //   _Cubes: [{by: }]
});

const AccessoryModel = mongoose.model("Accessory", AccessorySchema);

module.exports = AccessoryModel;
