const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");

const saltRounds = 5;

const createUser = (newUser) => {
  let username = newUser.username.trim();
  let password = newUser.password.trim();
  let repeatPassword = newUser.repeatPassword.trim();

  if (username == "" || password == "" || repeatPassword == "") {
    throw new Error("All fields are mandatory!");
  }

  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  return userModel.find({ username: username }).then((list) => {
    if (list.length > 0) {
      throw new Error("This username is taken");
    }

    return bcrypt
      .hash(password, saltRounds)
      .then((hashedPass) => userModel.create({ name: username, password: hashedPass }));
  });
};

const login = (user) => {
  let username = user.username.trim();
  let password = user.password.trim();
  return userModel.findOne({ username: username }).then((item) => {
    if (!item) {
      throw new Error("Username or password do not match");
    }
    return bcrypt.compare(password, item.password).then((res) => {
      if (res) {
        //wellcome
      } else {
        throw new Error("Username or password do not match");
      }
    });
  });
};

const authService = { createUser, login };

module.exports = authService;
