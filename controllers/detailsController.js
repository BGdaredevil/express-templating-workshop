const CubeModel = require("../config/dBase.js").models.CubeModel;

const get = (req, res) => {
  console.log(req.params.id);

  CubeModel.findById(req.params.id)
    .populate("_Accessories")
    .lean()
    .then((cube) => {
      // console.log(cube);
      cube.hasAcc = cube._Accessories.length > 0;
      res.render("details", { cube: cube });
    });
};

const post = (req, res) => {
  res.render("details");
};

module.exports = { get, post };
