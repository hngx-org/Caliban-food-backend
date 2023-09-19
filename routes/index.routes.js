const express = require("express");


const withdrawRouter = require('./withdraw.routes');


//Define the routes here.
module.exports = function routes(app) {
    app.use(express.json());
  
    // Registration & authentication routes.
    //   app.use("/api/user", userRouter);
    //   app.use("/api/auth", authRouter);

    // Any other routes
    app.use("/api/withdraw", withdrawRouter);
   

}