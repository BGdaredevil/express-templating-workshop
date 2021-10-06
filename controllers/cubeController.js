const router = require("express").Router();
const accessoryController = require("../controllers/accessoryController.js");

const cubeService = require("../services/cubeService.js");

const returnForm = (req, res) => {
  res.render("cubes/create");
};

const processFormData = (req, res) => {
  cubeService.addCube(req.body).then((r) => res.redirect("/"));
};

const returnOneCube = (req, res) => {
  cubeService.getOneCube(req.params.id).then((cube) => {
    cube.hasAcc = cube._Accessories.length > 0;
    res.render("cubes/details", { cube: cube });
  });
};

router.get("/create", returnForm);
router.post("/create", processFormData);
router.get("/:id", returnOneCube);
router.use("/:id/accessory", accessoryController);

module.exports = router;
