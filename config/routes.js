const router = require("express").Router();

const createController = require("../controllers/cubeController.js");
const homeController = require("../controllers/homeController.js");
const accessoryController = require("../controllers/accessoryController.js");

//debug
// function logger(req, res, next) {
//   console.log(req.path);
//   next();
// }
// router.use(logger);

router.use(homeController);
router.use("/cube", createController);
router.use("/accessory", accessoryController);
router.use("/about", (req, res) => res.render("about"));
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;
