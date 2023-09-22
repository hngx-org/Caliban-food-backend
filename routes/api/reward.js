const express = require("express");
const authenticateToken = require("../../middleware/user")
const router = express.Router();


const {
  addReward,
  getAllReward,
  getOneReward,
  redeemLunch
} = require("../../controllers/reward");

router.post("/send", authenticateToken, addReward);
router.get("/all", authenticateToken, getAllReward);
router.get("/:id", authenticateToken, getOneReward);
router.put('/redeem/:id',authenticateToken, redeemLunch)

module.exports = router;
