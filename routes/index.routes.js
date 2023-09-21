const express = require("express");
const sendInviteRoute = require("./sendInvite.routes");




//Define the routes here.
module.exports = function routes(app) {
  app.use(express.json());

  // Registration & authentication routes.
  //   app.use("/api/user", userRouter);
  //   app.use("/api/auth", authRouter);

app.use(sendInviteRoute)

  // Any other routes
};
