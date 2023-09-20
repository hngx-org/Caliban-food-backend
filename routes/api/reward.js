const express = require("express");
const router = express.Router();


const {
  addReward,
  getAllReward,
  getOneReward,
} = require("../../controllers/reward");


router.post("/api/lunch/send", addReward);
router.get("/api/lunch/all/", getAllReward);
router.get("/api/lunch/:id", getOneReward);

module.exports = router;