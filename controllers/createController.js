// const CubeModel = require("../models/cube.js");
const { CubeModel } = require("../config/dBase.js").models;

const get = (req, res) => {
  res.render("create");
};

const post = (req, res) => {
  CubeModel.create(req.body).then((r) => res.redirect("/"));
};

module.exports = { get, post };
