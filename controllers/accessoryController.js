const router = require("express").Router({ mergeParams: true });

const viewObj = require("../utils/decoViewObject.js");
const accService = require("../services/accessoriesService.js");
const cubeService = require("../services/cubeService.js");

const getAcc = (req, res) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }

  res.render("accessories/createAccessory", viewObj({}, true));
};

const postAcc = (req, res) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }
  accService.createAcc(req.body).then((r) => res.redirect("/"));
};

const serveCube = (req, res) => {
  //todo: check ownership
  cubeService.getOneCube(req.params.id).then((cube) => {
    accService.getNotAttached(cube._Accessories.map((c) => c._id)).then((notAttList) => {
      cube._Accessories = notAttList;
      cube.hasAcc = cube._Accessories.length > 0;
      res.render("accessories/attachAccessory", viewObj({ cube: cube }, req.user));
    });
  });
};

const addAcc = (req, res) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }
  cubeService
    .addAccessory(req.params.id, req.body.accessory)
    .then(() => res.redirect(`/cube/${req.params.id}`));
};

router.get("/create", getAcc);
router.post("/create", postAcc);
router.get("/add", serveCube);
router.post("/add", addAcc);

module.exports = router;
