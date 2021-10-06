const router = require("express").Router({ mergeParams: true });

const accService = require("../services/accessoriesService.js");
const cubeService = require("../services/cubeService.js");

const getAcc = (req, res) => {
  res.render("accessories/createAccessory");
};

const postAcc = (req, res) => {
  accService.createAcc(req.body).then((r) => res.redirect("/"));
};

const serveCube = (req, res) => {
  cubeService.getOneCube(req.params.id).then((cube) => {
    accService.getNotAttached(cube._Accessories.map((c) => c._id)).then((notAttList) => {
      cube._Accessories = notAttList;
      cube.hasAcc = cube._Accessories.length > 0;
      res.render("accessories/attachAccessory", { cube: cube });
    });
  });
};

const addAcc = (req, res) => {
  cubeService
    .addAccessory(req.params.id, req.body.accessory)
    .then(() => res.redirect(`/cube/${req.params.id}`));
};

router.get("/create", getAcc);
router.post("/create", postAcc);
router.get("/add", serveCube);
router.post("/add", addAcc);

module.exports = router;
