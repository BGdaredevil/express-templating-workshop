const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = require("../index.js").saltRounds;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true, minlength: 5 },
  password: { type: String, required: true, minlength: 8 },
  _myCubes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cube",
    },
  ],
});

UserSchema.pre("save", function (next) {
  console.log('first');
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
