const router = require("express").Router();
const accessoryController = require("../controllers/accessoryController.js");

const { CubeModel } = require("../config/dBase.js").models;

const returnForm = (req, res) => {
  res.render("cubes/create");
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
      cube.hasAcc = cube._Accessories.length > 0;
      res.render("cubes/details", { cube: cube });
    });
};

router.get("/create", returnForm);
router.post("/create", processFormData);
router.get("/:id", returnOneCube);
router.use("/:id/accessory", accessoryController);

module.exports = router;
