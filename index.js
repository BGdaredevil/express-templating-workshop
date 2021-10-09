const dBase = require("./config/dBase.js").connectDb;
const config = require("./config/config.js")["development"];
module.exports = config;

const app = require("express")();

require("./config/express")(app);

dBase(config.dBaseUrl).then(() => {
  console.log(`DB is connected at ${config.dBaseUrl}. Awaiting zakazi...`);
  app.listen(
    config.appPort,
    console.log(`Listening on port ${config.appPort}! Now its up to you...`)
  );
});
