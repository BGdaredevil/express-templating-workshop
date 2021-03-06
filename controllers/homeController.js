const router = require("express").Router();

const viewObj = require("../utils/decoViewObject.js");
const cubeService = require("../services/cubeService.js");

const get = (req, res) => {
  cubeService
    .getAllCubes()
    .then((cubes) => res.render("index", viewObj({ cubes: cubes }, req.user)))
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

const post = (req, res) => {
  const searchParams = {
    search: req.body.search.trim().toLowerCase(),
    from: Number(req.body.from),
    to: req.body.to == "" ? 6 : Number(req.body.to),
  };
  cubeService
    .filterCubes(searchParams)
    .then((cubes) => {
      const renderObj = {};
      if (cubes.length === 0) {
        renderObj.error = true;
        renderObj.message = "Sorry the search is empty... Try less specific search";
      }
      renderObj.cubes = cubes;
      res.render("index", viewObj(renderObj, req.user));
    })
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

router.get("/", get);
router.post("/", post);

module.exports = router;
