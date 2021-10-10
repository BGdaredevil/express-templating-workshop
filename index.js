const config = require("./config/config.js")[process.env.APP_ENV || "development"];
module.exports = config;

const mongoose = require("mongoose");
const app = require("express")();

require("./config/express")(app);

mongoose.connect(config.dBaseUrl).then(() => {
  console.log(`DB is connected at ${config.dBaseUrl}. Awaiting zakazi...`);
  app.listen(
    config.appPort,
    console.log(`Listening on port ${config.appPort}! Now its up to you...`)
  );
});
