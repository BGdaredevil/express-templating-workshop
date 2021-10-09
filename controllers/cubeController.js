const router = require("express").Router();

const viewObj = require("../utils/decoViewObject.js");
const accessoryController = require("../controllers/accessoryController.js");
const cubeService = require("../services/cubeService.js");
const { routeGuard } = require("../services/authService.js");

const returnForm = (req, res) => {
  res.render("cubes/create", viewObj({}, req.user));
};

const processFormData = (req, res) => {
  cubeService.addCube(req.body, req.user.id).then(() => {
    res.redirect("/");
  });
};

const returnOneCube = (req, res) => {
  //todo: add check for ownership
  // console.log(req.params);
  cubeService.getOneCube(req.params.id).then((cube) => {
    cube.hasAcc = cube._Accessories.length > 0;
    console.log(cube._owner._id == req.user.id);
    res.render(
      "cubes/details",
      viewObj({ cube: cube, isOwner: cube._owner._id == req.user.id }, req.user)
    );
  });
};

router.get("/create", routeGuard, returnForm);
router.post("/create", routeGuard, processFormData);
router.get("/:id", returnOneCube);
router.use("/:id/accessory", routeGuard, accessoryController);

module.exports = router;
