const express = require("express");

const {
  addReward,
  getAllReward,
  getOneReward,
  updateReward,
} = require("./../controllers/rewardControllers");

//Define the routes here.
module.exports = function routes(app) {
  app.use(express.json());

  // Registration & authentication routes.
  //   app.use("/api/user", userRouter);
  //   app.use("/api/auth", authRouter);

  // Any other routes
  app.post("/api/lunch/send", addReward);
  app.get("/api/lunch/all/", getAllReward);
  app.get("/api/lunch/:id", getOneReward);
  app.put("/api/lunch/redeem/:id", updateReward);
};
