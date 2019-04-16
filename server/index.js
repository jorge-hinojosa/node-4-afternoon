require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { checkForSession } = require("./middlewares/checkForSession");
const { getAllSwag } = require("./controllers/swagController");
const {
  login,
  register,
  signout,
  getUser
} = require("./controllers/authController");
const { add, remove, checkout } = require("./controllers/cartController");
const { search } = require("./controllers/searchController");

const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//ENDPOINTS
//Swag
app.get("/api/swag", getAllSwag);

//Authentication
app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/signout", signout);
app.get("/api/user", getUser);

//Cart
app.post("/api/cart/checkout", checkout);
app.post("/api/cart/:id", add);
app.delete("/api/cart/:id", remove);

//Search
app.get("/api/search", search);

app.listen(SERVER_PORT, () => console.log(`Yooo I'm on port ${SERVER_PORT}`));
