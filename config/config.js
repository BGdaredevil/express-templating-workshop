module.exports = {
  development: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3030",
    table: process.env.DB_TABLE || "Cubicl",
    dBaseUrl:  `mongodb://${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "3030"}/${process.env.DB_TABLE || "Cubicl"}`
  },
  production: {},
};
