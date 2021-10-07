const router = require("express").Router();

const authService = require("../services/authService.js");

const registerUser = (req, res) => {
  console.log(req.body);
  authService.register(req.body);
};

router.get("/register", (req, res) => res.render("user/register"));
router.post("/register", registerUser);
router.get("/login", (req, res) => res.render("user/login"));

module.exports = router;
