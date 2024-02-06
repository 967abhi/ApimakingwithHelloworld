const mongoose = require("mongoose");
// define the url of mongodb connection

const MONGODB_URL = "mongodb://localhost:27017/hotels";
// set up mongodb connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
//Define event listener for database connection
db.on("connected", () => {
  console.log("Connected to Mongodb Server");
});
db.on("error", () => {
  console.log("Mongodb connection error :", err);
});
db.on("disconnected", () => {
  console.log("Mongodb disconnection");
});

//Export the database connection
module.exports = db;