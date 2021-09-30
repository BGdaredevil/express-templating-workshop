const env = process.env.NODE_ENV || "development";
const dBase = require("./config/dBase.js").connectDb;
const config = require("./config/config.js")['development'];

console.log(config.dBaseUrl);
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);

dBase(config.dBaseUrl).then(() => {
  console.log(`DB is connected at ${config.dBaseUrl}. Awaiting zakazi...`);
  app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
});
