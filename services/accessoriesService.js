const AccessoryModel = require("../models/accessory.js");

const createAcc = (data) => {
  return AccessoryModel.create(data);
};

const getNotAttached = (attachedArr) => {
  return AccessoryModel.find({}).where("_id").nin(attachedArr).lean();
};

const accService = { createAcc, getNotAttached };

module.exports = accService;
