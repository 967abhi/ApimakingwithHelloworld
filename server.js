const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./db");
const bodyParser = require("body-parser");
const passport = require("./auth");

require("dotenv").config();

app.use(bodyParser.json());
app.use(passport.initialize());

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to: ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

const localAuthentication = passport.authenticate("local", { session: false });

app.get("/", localAuthentication, (req, res) => {
  res.send(
    "Welcome to my Hotel... How can I help you? We have a list of menus"
  );
});

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
