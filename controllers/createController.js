const Cube = require("../models/cube.js");

const get = (req, res) => {
  res.render("create");
};

const post = (req, res) => {
  let cube = new Cube(req.body);
  Cube.save(cube).then(() => res.redirect("/"));
};

module.exports = { get, post };
