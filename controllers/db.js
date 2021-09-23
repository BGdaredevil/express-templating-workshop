const fs = require("fs/promises");
const path = require("path");

const dbLoc = path.join(__dirname, "../config/database.json");

const addCube = (data) => {
  return fs
    .readFile(dbLoc)
    .then((e) => JSON.parse(e))
    .then((cubes) => {
      cubes.push(data);
      fs.writeFile(dbLoc, JSON.stringify(cubes, null, 2));
    });
};

const getCubes = () => {
  return fs.readFile(dbLoc).then((r) => JSON.parse(r));
};

const getOneCube = (id) => {
  return getCubes().then((cubes) => {
    return cubes.find((x) => x._id === id);
  });
};

// const removeCat = (id) => {
//   return getCats().then((cats) => {
//     cats = cats.filter((c) => c._id != id);
//     return fs.writeFile(catsLoc, JSON.stringify(cats));
//   });
// };

// const addBreed = (data) => {
//   return fs.readFile(breedsLoc).then((r) => {
//     r = JSON.parse(r);
//     if (r.some((x) => x._breed === data._breed)) {
//       return;
//     }
//     r.push(data);
//     return fs.writeFile(breedsLoc, JSON.stringify(r));
//   });
// };

// const getBreeds = () => {
//   return fs.readFile(breedsLoc).then((r) => JSON.parse(r));
// };

module.exports = { addCube, getCubes, getOneCube };
