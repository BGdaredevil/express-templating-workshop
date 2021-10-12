const router = require("express").Router();

const { routeGuard } = require("../services/authService.js");
const authService = require("../services/authService.js");
const cookie_name = require("../index.js").cookie_name;

const registerUser = (req, res) => {
  authService
    .createUser(req.body)
    .then((r) => {
      if (r.msg) {
        return res.render("user/register", {
          error: true,
          message: r.msg,
          username: req.body.username,
        });
      }
      return res.redirect("/user/login");
    })
    .catch((err) => res.render("user/register", { error: true, message: err.message }));
};

const loginUser = (req, res) => {
  authService
    .login({ username: req.body.username, password: req.body.password })
    .then((token) => {
      if (!token) {
        return res.render("user/login", {
          error: true,
          message: "Username or password do not match",
          username: req.body.username,
        });
      }

      res.cookie(cookie_name, token, { httpOnly: true });
      res.redirect("/");
    })
    .catch((err) => res.render("index", { error: true, message: err.message }));
};

const logoutUser = (req, res) => {
  res.clearCookie(cookie_name);
  res.redirect("login");
};

router.get("/register", routeGuard, (req, res) => res.render("user/register"));
router.post("/register", routeGuard, registerUser);

router.get("/login", routeGuard, (req, res) => res.render("user/login"));
router.post("/login", routeGuard, loginUser);

router.get("/logout", logoutUser);

module.exports = router;
