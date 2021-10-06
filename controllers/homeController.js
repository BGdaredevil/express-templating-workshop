const router = require("express").Router();

const cubeService = require("../services/cubeService.js");

const CubeModel = require("../models/cube.js");

const get = (req, res) => {
  cubeService.getAllCubes().then((cubes) => res.render("index", { cubes: cubes }));
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
    res.render("index", renderObj);
  });
};

router.get("/", get);
router.post("/", post);

module.exports = router;
