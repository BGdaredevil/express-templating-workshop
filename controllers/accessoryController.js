const router = require("express").Router({ mergeParams: true });
const { AccessoryModel, CubeModel } = require("../config/dBase.js").models;

const getAcc = (req, res) => {
  res.render("createAccessory");
};

const postAcc = (req, res) => {
  console.log(req.body);
  AccessoryModel.create(req.body).then((r) => res.redirect("/"));
};

const serveCube = (req, res) => {
  Promise.allSettled([
    CubeModel.findById(req.params.id).populate("_Accessories").lean(),
    AccessoryModel.find().lean(),
  ]).then(([cube, allAcc]) => {
    cube = cube.value;
    allAcc = allAcc.value;
    cube._Accessories = allAcc.reduce((acc, e) => {
      if (!cube._Accessories.some((x) => x._id.toString() === e._id.toString())) {
        acc.push(e);
      }
      return acc;
    }, []);

    cube.hasAcc = cube._Accessories.length > 0;
    res.render("accessories/attachAccessory", { cube: cube });
  });
};

const addAcc = (req, res) => {
  CubeModel.findById(req.params.id).then((r) => {
    r._Accessories.push(req.body.accessory);
    r.save().then((a) => {
      res.redirect(`/cube/${req.params.id}`);
    });
  });
};

router.get("/create", getAcc);
router.post("/create", postAcc);
router.get("/add", serveCube);
router.post("/add", addAcc);

module.exports = router;
