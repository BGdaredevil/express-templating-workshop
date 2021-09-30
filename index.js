const env = process.env.NODE_ENV || "development";
const dBase = require("./config/dBase.js").connectDb;
const config = require("./config/config.js")["development"];

console.log(config.dBaseUrl);
console.log(env);
console.log(config);
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);

dBase(config.dBaseUrl).then(() => {
  console.log(`DB is connected at ${config.dBaseUrl}. Awaiting zakazi...`);
  app.listen(
    config.appPort,
    console.log(`Listening on port ${config.appPort}! Now its up to you...`)
  );
});
