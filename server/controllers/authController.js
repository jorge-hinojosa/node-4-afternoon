const users = require("../models/users");
let id = 1;

const login = (req, res) => {
  const { session } = req;
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (user) {
    session.user.username = user.username;
    res.status(200).json(session.user);
  } else {
    res.status(500).json({ error: `Sorry, user ${user} not found` });
  }
};

const register = (req, res) => {
  const { session } = req;
  const { username, password } = req.body;

  users.push({ id, username, password });
  id++;

  session.user.username = username;

  res.status(200).json(session.user);
};

const signout = (req, res) => {
  req.session.destroy();
  res.status(200).json(req.session);
};

const getUser = (req, res) => {
  res.status(200).json(req.session.user);
};

module.exports = { login, register, signout, getUser };
