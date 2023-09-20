const db = require("../models/index");

// create main Model
const Reward = db.models.reward;

// 1. create reward

const addReward = async (req, res) => {
  let info = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    quantity: req.body.quantity,
    redeemed: req.body.redeemed,
    note: req.body.note,
  };

  const reward = await Reward.create(info);
  res.status(200).send(reward);
  console.log(reward);
};

// 2. get all rewards

const getAllReward = async (req, res) => {
  let reward = await Reward.findAll({});
  res.status(200).send(reward);
};

// 3. get single reward

const getOneReward = async (req, res) => {
  let id = req.params.id;
  let reward = await Reward.findOne({ where: { id: id } });
  res.status(200).send(reward);
};

// 4. redeem reward
// to change the boolen from true to false after the reward has been redeem

const updateReward = async (req, res) => {
  let id = req.params.id;

  const reward = await Reward.update(req.body, { where: { id: id } });

  res.status(200).send(reward);
};

module.exports = {
  addReward,
  getAllReward,
  getOneReward,
  updateReward,
};
