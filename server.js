const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //req.biody
app.get("/", (req, res) => {
  res.send("Welcome to my Hotel... How i can help You ? we have list of menus");
});

// IMport the router file
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
//use the Routes
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
