module.exports = function (num, opt) {
  return opt.fn(this).replace(new RegExp(' value="' + num + '"'), "$& selected");
};
