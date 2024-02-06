const express = require("express");
const router = express.Router();
const menuItem = require("../models/Menu");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menuItem(data);
    const response = await newMenu.save();
    console.log("Data saved menu item");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("menu Item fetched "), res.status(200).json(data);
  } catch (Error) {
    console.log(Error);
    res.status(500).json({
      Error: "Internal server Error",
    });
  }
});
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await menuItem.find({ taste: tasteType });
      console.log("Data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});
//git added
module.exports = router;
