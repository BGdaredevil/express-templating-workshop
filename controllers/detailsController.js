// const db = require("../controllers/db.js");

const CubeModel = require("../config/dBase.js").models.CubeModel;

const get = (req, res) => {
  // db.getOneCube(req.params.id).then((cube) => {
  //   res.render("details", { cube: cube });
  // });
  console.log(req.params.id);

  CubeModel.findById(req.params.id)
    .lean()
    .then((cube) => {
      console.log(cube);
      // console.log("called");

      res.render("details", { cube: cube });
    });
};

const post = (req, res) => {
  res.render("details");
};

module.exports = { get, post };
