// TODO: Require Controllers...
const router = require("express").Router();

const createController = require("../controllers/cubeController.js");
const homeController = require("../controllers/homeController.js");
const accessoryController = require("../controllers/accessoryController.js");

function logger(req, res, next) {
  console.log(req.path);
  next();
}

router.use(logger);
router.use(homeController);
router.use("/cube", createController);
router.use("/accessory", accessoryController);
router.use("/about", (req, res) => res.render("about"));
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;

// module.exports = (app) => {
//   app.route("/create/accessory").get(accessoryController.getAcc).post(accessoryController.postAcc);
//   app.route("/attach/accessory/:id").get(accessoryController.serveCube).post(accessoryController.addAcc);
// };
