const jwt = require("jsonwebtoken");

const secret = require("../index.js").secret;
const tokenExpDate = require("../index.js").tokenExpDate;

const userModel = require("../models/user.js");

const createUser = (newUser) => {
  let username = newUser.username.trim();
  let password = newUser.password.trim();
  let repeatPassword = newUser.repeatPassword.trim();

  if (username == "" || password == "" || repeatPassword == "") {
    return new Promise((resolve) => resolve({ msg: "All fields are mandatory!" }));
  }

  if (username.length < 5) {
    return new Promise((resolve) => resolve({ msg: "Username is too short" }));
  }

  if (!/^[a-z0-9]+$/gi.test(username)) {
    return new Promise((resolve) => resolve({ msg: "Username is invalid" }));
  }

  if (password.length < 8) {
    return new Promise((resolve) => resolve({ msg: "Password is too short" }));
  }

  if (!/^[a-z\s0-9]+$/gi.test(password)) {
    return new Promise((resolve) => resolve({ msg: "Password is invalid" }));
  }

  if (password !== repeatPassword) {
    return new Promise((resolve) => resolve({ msg: "Passwords do not match" }));
  }

  return userModel.find({ username: username }).then((list) => {
    if (list.length > 0) {
      return new Promise((resolve) => resolve({ msg: "This username is taken" }));
    }

    return userModel.create({ username, password });
  });
};

const login = (user) => {
  let username = user.username.trim();
  let password = user.password.trim();
  return userModel.findOne({ username: username }).then((item) => {
    if (!item) {
      return null;
    }
    return item.verifyPass(password).then((isValid) => {
      if (isValid) {
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
      } else {
        return null;
      }
    });
  });
};

const checkTocken = (req, res, next) => {
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
