const swag = require("../models/swag");

const add = (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  const index = user.cart.findIndex(item => item.id == id);

  if (index === -1) {
    const item = swag.find(item => item.id == id);

    user.cart.push(item);
    user.total += item.price;
  }

  res.status(200).json(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  const index = user.cart.findIndex(item => item.id == id);
  const item = swag.find(item => item.id == id);

  if (index !== -1) {
    user.cart.splice(index, 1);
    user.total -= item.price;
  }

  res.status(200).json(user);
};

const checkout = (req, res) => {
  const { user } = req.session;

  user.cart = [];
  user.total = 0;

  res.status(200).json(user);
};

module.exports = { add, remove, checkout };
