const { AccessoryModel, CubeModel } = require("../config/dBase.js").models;

const getAcc = (req, res) => {
  res.render("createAccessory");
};

const postAcc = (req, res) => {
  console.log(req.body);
  AccessoryModel.create(req.body).then((r) => res.redirect("/"));
};

const serveCube = (req, res) => {
  console.log(req.params.id);
  CubeModel.findById(req.params.id)
    .populate("_Accessories")
    .lean()
    .then((cube) => {
      cube.hasAcc = cube._Accessories.length > 0;
      console.log(cube);
      res.render("attachAccessory", { cube: cube });
    });
};

const addAcc = (req, res) => {
  console.log("called with post");
};

module.exports = { getAcc, postAcc, serveCube, addAcc };
