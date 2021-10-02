const express = require("express");
const handlebars = require("express-handlebars");
const router = require('../config/routes.js')
const path = require('path')

module.exports = (app) => {
  app.engine("hbs", handlebars({ extname: "hbs" }));
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, '../static')));
  app.use(router)
};
