const express = require("express");
const logger = require("./routes/logger");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api/logger", logger);

app.listen(5523, () => {
  console.log("слушаем 5523 порт");
});

mongoose
  .connect("mongodb://localhost:27017/rz", {
    useNewUrlParser: true,
    autoIndex: false,
    userCreateIndex: true
  })
  .then(() => {
    console.log("подключилсь к монге ;)");
  })
  .catch(e => {
    console.log("к монге не подключились =(");
  });
