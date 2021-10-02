const router = require("express").Router();

const { CubeModel } = require("../config/dBase.js").models;

const returnForm = (req, res) => {
  res.render("create");
};

const processFormData = (req, res) => {
  CubeModel.create(req.body).then((r) => res.redirect("/"));
};

const returnOneCube = (req, res) => {
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

router.get("/create", returnForm);
router.post("/create", processFormData);
router.get("/:id", returnOneCube);

module.exports = router;
