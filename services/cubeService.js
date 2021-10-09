const CubeModel = require("../models/cube.js");
const UserModel = require("../models/user.js");

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

const addCube = (data, userId) => {
  return Promise.allSettled([CubeModel.create(data), UserModel.findById(userId)]).then(
    ([cube, user]) => {
      console.log(user.value);
      user.value._myCubes.push(cube.value);
      return user.value.save();
    }
  );
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
