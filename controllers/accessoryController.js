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
  console.log(req.params.id);
  Promise.allSettled([
    CubeModel.findById(req.params.id).populate("_Accessories").lean(),
    AccessoryModel.find().lean(),
  ]).then(([cube, allAcc]) => {
    cube = cube.value;
    allAcc = allAcc.value;
    console.log("present now");
    console.log(cube._Accessories);

    console.log("existing");
    console.log(allAcc);

    cube._Accessories = allAcc.reduce((acc, e) => {
      if (!cube._Accessories.some((x) => x._id.toString() === e._id.toString())) {
        acc.push(e);
      }
      return acc;
    }, []);

    console.log("not attached");
    console.log(cube._Accessories);

    cube.hasAcc = cube._Accessories.length > 0;
    res.render("attachAccessory", { cube: cube });
  });

  //   CubeModel.findById(req.params.id)
  //     .populate("_Accessories")
  //     .lean()
  //     .then((cube) => {
  //       cube.hasAcc = cube._Accessories.length > 0;
  //       console.log(cube);
  //       res.render("attachAccessory", { cube: cube });
  //     });
};

const addAcc = (req, res) => {
  console.log("called with post " + req.params.id);
  console.log(req.body);
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

// module.exports = { getAcc, postAcc, serveCube, addAcc };
