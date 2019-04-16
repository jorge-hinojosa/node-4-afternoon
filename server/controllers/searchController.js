const swag = require("../models/swag");

const search = (req, res) => {
  const { category } = req.query;
  if (!category) {
    res.status(200).json(swag);
  } else {
    const filtSwag = swag.filter(swag => swag.category === category);
    res.status(200).json(filtSwag);
  }
};

module.exports = { search };
