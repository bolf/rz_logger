const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dateFormat = require("dateformat");

const logSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  eventDate: { type: Date, required: true, default: Date.now },
  event: { type: String, required: true },
  comment: { type: String, required: false }
});

const LogModel = mongoose.model("Log", logSchema);

router.get("/", async (req, res) => {
  if (!(req.body.eventType && req.body.eventDate)) {
    return res
      .status(400)
      .send(
        "для получения данных укажите отборы: eventDate (сравнение на больше или равно), eventType (сравнение на равно)"
      );
  }

  try {
    const logs = await LogModel.find({
      eventType: req.body.eventType,
      eventDate: {
        $gte: Date.parse(dateFormat(req.body.eventDate, "isoUtcDateTime"))
      }
    }).sort("eventDate");
    res.send(logs);
  } catch (e) {
    res.status(400).send("что-то пошло не так..");
  }
});

router.post("/", async (req, res) => {
  try {
    var log = new LogModel(req.body);
    log = await log.save();
    res.send(log._id);
  } catch (e) {
    res.status(400).send("что-то пошло не так..");
  }
});

module.exports = router;
