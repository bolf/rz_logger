const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  eventDate: { type: Date, required: true, default: Date.now },
  event: { type: String, required: true },
  comment: { type: String, required: false }
});

router.get("/", (req, res) => {
  try {
  } catch (e) {
    res.status(500).send("что-то пошло не так..");
  }
});

module.exports = router;
