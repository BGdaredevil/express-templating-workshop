// const CubeModel = require("../models/cube.js");
const CubeModel = require("../config/dBase.js").models.CubeModel;

const get = (req, res) => {
  res.render("create");
};

const post = (req, res) => {
  CubeModel.create(req.body).then((r) => {
    // console.log(r);
    res.redirect("/");
  });

  // let cube = new CubeModel(req.body);
  // let test = new CubeModel({ name: "peshka" });
  // console.log(req.body);
  // console.log(cube);
  // console.log(test);
  // test.save().then((r) => {
  //   console.log(r);
  // });
  // cube.save();
};

module.exports = { get, post };
