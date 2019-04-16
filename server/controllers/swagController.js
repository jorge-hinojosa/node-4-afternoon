const swag = require("../models/swag");

const getAllSwag = (req, res, next) => {
  res.status(200).json(swag);
};

module.exports = {
  getAllSwag
};
