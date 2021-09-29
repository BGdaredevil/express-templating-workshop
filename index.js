const env = process.env.NODE_ENV || "development";
const dBase = require("./config/dBase.js");

const config = require("./config/config")[env];
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);

dBase(config.dBaseUrl).then(() => {
  console.log(`DB is connected at ${config.dBaseUrl}. Awaiting zakazi...`);
  app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
});
