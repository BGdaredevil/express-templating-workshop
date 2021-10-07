const router = require("express").Router();

const viewObj = require("../utils/decoViewObject.js");

const cubeService = require("../services/cubeService.js");

const get = (req, res) => {
  console.log(req.user);
  cubeService
    .getAllCubes()
    .then((cubes) => res.render("index", viewObj({ cubes: cubes }, req.user)));
};

const post = (req, res) => {
  const searchParams = {
    search: req.body.search.trim().toLowerCase(),
    from: Number(req.body.from),
    to: req.body.to == "" ? 6 : Number(req.body.to),
  };
  cubeService.filterCubes(searchParams).then((cubes) => {
    const renderObj = {};
    if (cubes.length === 0) {
      renderObj.err = "Sorry the search is empty... Try less specific search";
    }
    renderObj.cubes = cubes;
    res.render("index", viewObj(renderObj, req.user));
  });
};

router.get("/", get);
router.post("/", post);

module.exports = router;
