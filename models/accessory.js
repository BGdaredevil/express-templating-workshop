const mongoose = require("mongoose");

const AccessorySchema = new mongoose.Schema({
  _name: {type: String, minlength: 5, validate: /[a-z\s0-9]+/gi, trim: true, required: true},
  _description: {type: String, minlength: 20, validate: /[a-z\s0-9]+/gi, trim: true, required: true},
  _imageUrl: {type: String, validate: /^https?:\/{2}/, trim: true, required: true},
  _Cubes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cube",
    },
  ],
});

const AccessoryModel = mongoose.model("Accessory", AccessorySchema);

module.exports = AccessoryModel;
