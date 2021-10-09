const router = require("express").Router();

const { routeGuard } = require("../services/authService.js");
const authService = require("../services/authService.js");
const viewObj = require("../utils/decoViewObject.js");

const registerUser = (req, res) => {
  try {
    authService
      .createUser(req.body)
      .then((r) => {
        // console.log(r);
        res.render("user/login", viewObj());
      })
      .catch((err) => res.render("user/register", { error: true, message: err.message }));
  } catch (err) {
    res.render("user/register", { error: true, message: err.message });
  }
};

const loginUser = (req, res) => {
  try {
    console.log(req.body);
    authService.login(req.body).then((r) => {
      console.log(r);
      res.cookie("CubeLoginData", r, { httpOnly: true });
      res.redirect("/");
    });
  } catch (err) {
    res.render("user/login", { error: true, message: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("CubeLoginData");
  res.redirect("login");
};

router.get("/register", routeGuard, (req, res) => res.render("user/register"));
router.post("/register", routeGuard, registerUser);
router.get("/login", routeGuard, (req, res) => res.render("user/login"));
router.post("/login", routeGuard, loginUser);
router.get("/logout", logoutUser);

module.exports = router;