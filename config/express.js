const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

const router = require("../config/routes.js");
const { checkTocken } = require("../services/authService.js");

module.exports = (app) => {
  app.engine("hbs", handlebars({ extname: "hbs" }));
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, "../static")));
  app.use(cookieParser());
  app.use(checkTocken);
  app.use(router);
};
