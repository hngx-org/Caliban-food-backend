// Withdrawal routes

const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/user");
const withdrawalController = require("../../controllers/withdraw");

router.post(
  "/withdrawal/request",
  authMiddleware,
  withdrawalController.makeWithdrawal
);

module.exports = router;
