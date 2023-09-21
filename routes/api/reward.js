const express = require("express");
const router = express.Router();

const {
  addReward,
  getAllReward,
  getOneReward,
  updateReward
} = require("../../controllers/reward");

router.post("/send", addReward);
router.get("/:params/:id", getAllReward);
router.get("/:id", getOneReward);
router.get("/:id", updateReward);

module.exports = router;
