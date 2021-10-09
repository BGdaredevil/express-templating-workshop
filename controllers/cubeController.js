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
  cubeService.addCube(req.body, req.user.id).then(() => {
    res.redirect("/");
  });
};

const returnOneCube = (req, res) => {
  cubeService.getOneCube(req.params.id).then((cube) => {
    cube.hasAcc = cube._Accessories.length > 0;
    res.render(
      "cubes/details",
      viewObj({ cube: cube, isOwner: cube._owner._id == req.user.id }, req.user)
    );
  });
};

const getEditDelete = (req, res) => {
  cubeService.getOneCube(req.params.id).then((cube) => {
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
  });
};
const postEdit = (req, res) => {
  cubeService.editCube(req.params.id, req.body).then((r) => {
    console.log(r);
    res.redirect(`/cube/${req.params.id}`);
  });
};

const postDel = (req, res) => {
  cubeService.delCube(req.params.id, req.user.id).then(() => res.redirect("/"));
};

router.get("/create", routeGuard, returnForm);
router.post("/create", routeGuard, processFormData);
router.get("/:id", returnOneCube);
router.use("/:id/accessory", routeGuard, accessoryController);
router.get("/:id/edit", routeGuard, getEditDelete);
router.post("/:id/edit", routeGuard, postEdit);
router.get("/:id/delete", routeGuard, getEditDelete);
router.post("/:id/delete", routeGuard, postDel);

module.exports = router;
