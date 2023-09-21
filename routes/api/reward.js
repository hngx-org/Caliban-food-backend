const express = require("express");
const authenticateToken = require("../../middleware/user")
const router = express.Router();


const {
  addReward,
  getAllReward,
  getOneReward
} = require("../../controllers/reward");

router.post("/send", authenticateToken, addReward);
router.get("/all", authenticateToken, getAllReward);
router.get("/:id", authenticateToken, getOneReward);

module.exports = router;
