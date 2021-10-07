const router = require("express").Router();

const viewObj = require("../utils/decoViewObject.js");
const accessoryController = require("../controllers/accessoryController.js");
const cubeService = require("../services/cubeService.js");

const returnForm = (req, res) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }
  res.render("cubes/create", viewObj({}, req.user));
};

const processFormData = (req, res) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }

  cubeService.addCube(req.body).then((r) => res.redirect("/"));
};

const returnOneCube = (req, res) => {
  //todo: add check for ownership
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
