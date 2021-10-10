const router = require("express").Router();

const { routeGuard } = require("../services/authService.js");
const authService = require("../services/authService.js");
const cookie_name = require("../index.js").cookie_name;

const registerUser = (req, res) => {
  try {
    authService
      .createUser(req.body)
      .then((r) => {
        res.redirect("/user/login");
      })
      .catch((err) => res.render("user/register", { error: true, message: err.message }));
  } catch (err) {
    res.render("user/register", { error: true, message: err.message });
  }
};

// const { body, validationResult } = require("express-validator");

const loginUser = (req, res) => {
  // console.log(validationResult(req));
  authService.login(req.body).then((token) => {
    if (!token) {
      return res.render("user/login", {
        error: true,
        message: "Username or password do not match",
      });
    }

    res.cookie(cookie_name, token, { httpOnly: true });
    res.redirect("/");
  });
};

const logoutUser = (req, res) => {
  res.clearCookie(cookie_name);
  res.redirect("login");
};

router.get("/register", routeGuard, (req, res) => res.render("user/register"));
router.post("/register", routeGuard, registerUser);
router.get("/login", routeGuard, (req, res) => res.render("user/login"));
router.post("/login", routeGuard, /*body("username").isEmail(),*/ loginUser);
router.get("/logout", logoutUser);

module.exports = router;
