const express = require("express");

const {
  addLunch,
  getAllLunch,
  getOneLunch,
  updateLunch
} = require("./../controllers/lunchControllers");

//Define the routes here.
module.exports = function routes(app) {
  app.use(express.json());

  // Registration & authentication routes.
  //   app.use("/api/user", userRouter);
  //   app.use("/api/auth", authRouter);

  // Any other routes
  app.post("/api/lunch/send", addLunch);
  app.get("/api/lunch/all/", getAllLunch);
  app.get("/api/lunch/:role/:id", getOneLunch);
  app.put("/api/lunch/redeem/:id", updateLunch);
};
