const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.js");

const saltRounds = 5;
const secret = "pesho likes gosho";
const tokenExpDate = "1d";

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
      .then((hashedPass) => userModel.create({ username: username, password: hashedPass }));
  });
};

const login = (user) => {
  let username = user.username.trim();
  let password = user.password.trim();
  return userModel.findOne({ username: username }).then((item) => {
    if (!item) {
      return new Error("Username or password do not match");
    }
    return bcrypt.compare(password, item.password).then((res) => {
      if (res) {
        const payload = { id: item._id, username: item.username };

        return new Promise((resolve, reject) => {
          jwt.sign(payload, secret, { expiresIn: tokenExpDate }, (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          });
        });

        // return item;
      } else {
        return new Error("Username or password do not match");
      }
    });
  });
};

const checkTocken = (req, res, next) => {
  //   console.log(req?.cookies);
  const token = req?.cookies["CubeLoginData"];
  if (token != undefined) {
    jwt.verify(token, secret, {}, (err, tInfo) => {
      req.user = tInfo;
      next();
    });
  } else {
    next();
  }
};

const routeGuard = (req, res, next) => {
  console.log(req.path);

  if (req.user) {
    if (req.path == "/login" || req.path == "/register") {
      return res.redirect("/");
    }
    next();
  } else {
    if (req.path == "/login" || req.path == "/register") {
      return next();
    }
    res.status(401).redirect("/user/login");
  }
};

const authService = { createUser, login, checkTocken, routeGuard };

module.exports = authService;
