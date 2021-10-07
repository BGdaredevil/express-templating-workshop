const router = require("express").Router();

const viewObj = require("../utils/decoViewObject.js");
const createController = require("../controllers/cubeController.js");
const homeController = require("../controllers/homeController.js");
const accessoryController = require("../controllers/accessoryController.js");
const userController = require("../controllers/userController.js");

//debug
// function logger(req, res, next) {
//   console.log(req.path);
//   next();
// }
// router.use(logger);

router.use(homeController);
router.use("/cube", createController);
router.use("/accessory", accessoryController);
router.use("/user", userController);
router.use("/about", (req, res) => res.render("about", viewObj({}, req.user)));
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;
