module.exports = {
  development: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    appPort: process.env.APP_PORT || "3030",
    table: process.env.DB_TABLE || "Cubicle",
    dBaseUrl: `mongodb://${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "27017"}/${
      process.env.DB_TABLE || "Cubicle"
    }`,
    saltRounds: 5,
    cookie_name: "CubeLoginData",
    secret: "pesho likes gosho",
    tokenExpDate: "1d",
  },
  production: {},
};
