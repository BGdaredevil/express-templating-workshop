module.exports = (obj = {}, data) => {
  obj.user = Boolean(data);
  return obj;
};
