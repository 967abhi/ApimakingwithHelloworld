const mongoose = require("mongoose");
require("dotenv").config();
// define the url of mongodb connection

// const MONGODB_URL = "mongodb://localhost:27017/hotels";
const MONGODB_URL = process.env.DB_URL;
// set up mongodb connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // ssl: true, // Enable SSL
  // sslValidate: false,
});
const db = mongoose.connection;
//Define event listener for database connection
db.on("connected", () => {
  console.log("Connected to Mongodb Server");
});
db.on("error", () => {
  console.log("Mongodb connection error :");
});
db.on("disconnected", () => {
  console.log("Mongodb disconnection");
});

//Export the database connection
module.exports = db;
