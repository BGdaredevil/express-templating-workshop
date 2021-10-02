const router = require("express").Router({ mergeParams: true });

const CubeModel = require("../models/cube.js");

const get = (req, res) => {
  CubeModel.find({})
    .lean()
    .then((cubes) => res.render("index", { cubes: cubes }));
};

const post = (req, res) => {
  // console.log(req.body);
  CubeModel.find({})
    .lean()
    .then((cubes) => {
      const renderObj = {};
      if (req.body.search.trim() !== "") {
        cubes = cubes.filter((c) =>
          c._name.toLowerCase().includes(req.body.search.trim().toLowerCase())
        );
      }

      if (req.body.from !== "") {
        cubes = cubes.filter((c) => c._difficultyLevel >= Number(req.body.from));
      }

      if (req.body.to !== "") {
        cubes = cubes.filter((c) => c._difficultyLevel <= Number(req.body.to));
      }

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
