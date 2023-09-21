const express = require("express");
const router = express.Router();

const {
  addReward,
  getAllReward,
  getOneReward
} = require("../../controllers/reward");

router.post("/send", addReward);
router.get("/all", getAllReward);
router.get("/:id", getOneReward);

module.exports = router;
