const router = require("express").Router();

const viewObj = require("../utils/decoViewObject.js");
const accessoryController = require("../controllers/accessoryController.js");
const cubeService = require("../services/cubeService.js");
const { routeGuard } = require("../services/authService.js");
const selectOpt = require("../utils/selectHelper.js");

const returnForm = (req, res) => {
  res.render("cubes/create", viewObj({}, req.user));
};

const processFormData = (req, res) => {
  cubeService
    .addCube(req.body, req.user.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

const returnOneCube = (req, res) => {
  cubeService
    .getOneCube(req.params.id)
    .then((cube) => {
      cube.hasAcc = cube._Accessories.length > 0;
      res.render(
        "cubes/details",
        viewObj({ cube: cube, isOwner: cube._owner._id == req.user?.id }, req.user)
      );
    })
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

const getEditDelete = (req, res) => {
  cubeService
    .getOneCube(req.params.id)
    .then((cube) => {
      if (cube._owner !== req.user._id) {
        res.redirect("/");
        return;
      }
      res.render(
        "cubes/editDelete",
        viewObj(
          {
            cube: cube,
            isEdit: req.path.includes("edit"),
            dis: req.path.includes("edit") ? "" : "disabled",
            helpers: {
              selectOpt: selectOpt,
            },
          },
          req.user
        )
      );
    })
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

const postEdit = (req, res) => {
  cubeService
    .editCube(req.params.id, req.body)
    .then(() => {
      res.redirect(`/cube/${req.params.id}`);
    })
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

const postDel = (req, res) => {
  cubeService.delCube(req.params.id, req.user.id).then(() => res.redirect("/"));
};

router.get("/create", routeGuard, returnForm);
router.post("/create", routeGuard, processFormData);
router.get("/:id", returnOneCube);
router.get("/:id/edit", routeGuard, getEditDelete);
router.post("/:id/edit", routeGuard, postEdit);
router.get("/:id/delete", routeGuard, getEditDelete);
router.post("/:id/delete", routeGuard, postDel);

router.use("/:id/accessory", routeGuard, accessoryController);

module.exports = router;
