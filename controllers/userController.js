const router = require("express").Router();

const { routeGuard } = require("../services/authService.js");
const authService = require("../services/authService.js");

const registerUser = (req, res) => {
  try {
    authService
      .createUser(req.body)
      .then((r) => {
        console.log(r);
        res.redirect("/user/login");
      })
      .catch((err) => res.render("user/register", { error: true, message: err.message }));
  } catch (err) {
    // console.log(err);
    res.render("user/register", { error: true, message: err.message });
  }
};

const loginUser = (req, res) => {
  console.log(req.body);
  authService.login(req.body).then((token) => {
    // console.log(token);

    if (!token) {
      return res.render("user/login", {
        error: true,
        message: "Username or password do not match",
      });
    }

    res.cookie("CubeLoginData", token, { httpOnly: true });
    res.redirect("/");
  });
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
