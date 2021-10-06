const CubeModel = require("../models/cube.js");

const getAllCubes = (lean) => {
  if (!lean) {
    return CubeModel.find({}).lean();
  } else {
    return CubeModel.find({});
  }
};

const getOneCube = (id, lean) => {
  if (!lean) {
    return CubeModel.findById({ _id: id }).populate("_Accessories").lean();
  } else {
    return CubeModel.findById({ _id: id }).populate("_Accessories");
  }
};

const addCube = (data) => {
  return CubeModel.create(data);
};

const filterCubes = (paramsObj) => {
  const searchParams = {
    $and: [{ _difficultyLevel: { $gte: 1 } }, { _difficultyLevel: { $lte: 6 } }],
  };
  if (paramsObj.search !== "") {
    searchParams.$and.push({ _name: new RegExp(paramsObj.search) });
  }

  if (paramsObj.from !== "") {
    searchParams.$and[0] = { _difficultyLevel: { $gte: paramsObj.from } };
  }

  if (paramsObj.to !== "") {
    searchParams.$and[1] = { _difficultyLevel: { $lte: paramsObj.to } };
  }
  return CubeModel.find(searchParams).lean();
};

const addAccessory = (cubeId, accData) => {
  return CubeModel.findById({ _id: cubeId }).then((cube) => {
    cube._Accessories.push(accData);
    return cube.save();
  });
};

const cubeService = { getAllCubes, filterCubes, addCube, getOneCube, addAccessory };

module.exports = cubeService;
