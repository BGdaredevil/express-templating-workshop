const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
  _name: { type: String, required: true, trim: true },
  _description: { type: String, required: true, maxlength: 100, trim: true },
  _imageUrl: { type: String, required: true, trim: true },
  _Cubes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cube",
    },
  ],
});

const AccessoryModel = mongoose.model("Accessory", AccessorySchema);

module.exports = AccessoryModel;
