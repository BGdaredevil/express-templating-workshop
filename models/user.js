const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  _myCubes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cube",
    },
  ],
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
