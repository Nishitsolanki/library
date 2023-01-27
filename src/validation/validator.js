
const mongoose = require('mongoose')

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

  const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

const isValidNumber = function (number) {
  const mobileRegex = /^[1]{}[9]{}$/
  return mobileRegex.test(number);
}

  module.exports ={isValidObjectId,isValid,isValidNumber}