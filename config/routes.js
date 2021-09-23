// TODO: Require Controllers...

const createController = require("../controllers/createController.js");
const homeController = require("../controllers/homeController.js");
const detailsController = require("../controllers/detailsController.js");

module.exports = (app) => {
  app.route("/details/:id").get(detailsController.get);
  app.route("/create").get(createController.get).post(createController.post);
  app.route("/about").all((req, res) => res.render("about"));
  app.route("/").get(homeController.get).post(homeController.post);
  app.route("*").all((req, res) => {
    res.render("404");
  });
};
