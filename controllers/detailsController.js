const db = require("../controllers/db.js");

const get = (req, res) => {
  db.getOneCube(req.params.id).then((cube) => {
    res.render("details", { cube: cube });
  });
};

const post = (req, res) => {
  res.render("details");
};

module.exports = { get, post };
