const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 5;

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

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltRounds).then((hashedPass) => {
    this.password = hashedPass;
    next();
  });
});

UserSchema.method("verifyPass", function (pass) {
  return bcrypt.compare(pass, this.password);
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
