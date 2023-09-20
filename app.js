const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
// const db = require("./configs/dbConfig");
const db = require("./configs/dbConfig");
const sequelize = require("./configs/dbConfig");
// App Init
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
  await db.sequelize.sync();
})();

// App Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Lunch App API");
});

// Register Routes
require("./routes/index.routes")(app);

// We'd uncomment this db function call once we have the connection strings and add it to the db file.
// db();

// sequelize
//   .sync()
//   .then((result) => {
//     console.log("Database synchronized");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = app;
