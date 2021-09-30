module.exports = {
  development: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    appPort: "3030",
    table: process.env.DB_TABLE || "Cubicle",
    dBaseUrl: `mongodb://${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "27017"}/${
      process.env.DB_TABLE || "Cubicle"
    }`,
  },
  production: {},
};
