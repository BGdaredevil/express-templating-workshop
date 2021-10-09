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
      user.value._myCubes.push(cube.value);
      cube.value._owner = user.value;
      return Promise.allSettled([user.value.save(), cube.value.save()]);
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

const editCube = (cubeId, newData) => {
  return CubeModel.findByIdAndUpdate(
    cubeId,
    {
      _name: newData.name,
      _description: newData.description,
      _imageUrl: newData.imageUrl,
      _difficultyLevel: newData.difficultyLevel,
    },
    { runValidators: true, new: true }
  );
};

const delCube = (cubeId, ownerId) => {
  return Promise.allSettled([
    CubeModel.findByIdAndDelete(cubeId),
    UserModel.findById(ownerId),
  ]).then(([temp, owner]) => {
    owner.value._myCubes = owner.value._myCubes.filter(
      (c) => c._id.toString() != temp.value._id.toString()
    );
    return owner.value.save();
  });
};

const cubeService = {
  getAllCubes,
  filterCubes,
  addCube,
  getOneCube,
  addAccessory,
  editCube,
  delCube,
};

module.exports = cubeService;
