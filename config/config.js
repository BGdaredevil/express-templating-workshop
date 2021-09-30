module.exports = {
  development: {
    port: process.env.PORT || 3030,
    dBaseUrl: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/Cubicl`,
  },
  production: {},
};
