const router = require("express").Router();

const authService = require("../services/authService.js");

const registerUser = (req, res) => {
  //   console.log(req.body);
  try {
    authService.createUser(req.body).then((r) => {
      console.log(r);
      res.render("/");
    });
  } catch (err) {
    res.render("user/register", { error: true, message: err.message });
  }
};

const loginUser = (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    res.render("user/login", { error: true, message: err.message });
  }
};

router.get("/register", (req, res) => res.render("user/register"));
router.post("/register", registerUser);
router.get("/login", (req, res) => res.render("user/login"));
router.post("/login", loginUser);

module.exports = router;
