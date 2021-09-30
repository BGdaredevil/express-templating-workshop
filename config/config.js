module.exports = {
  development: {
    port: process.env.DB_PORT || 3030,
    dBaseUrl: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/Cubicl`,
  },
  production: {},
};