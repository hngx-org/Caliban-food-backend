const { Lunches } = require("../models");
const { User } = require("../models");
const { Op } = require("sequelize");

// create main Model
const Reward = Lunches;

/**
 *  @description  Create reward
 *  @route        POST /api/lunch/send
 *  @access       Public
 *
 */

// 1. create reward
// destructuring
const addReward = async (req, res) => {
  try {
    const { receiverId, quantity, note } = req.body;
    const {id} = req.user;
    if (typeof quantity == "string") {
      return res.status(400).json({
        message: "Invalid Quantity",
        statusCode: 400,
      });
    }
    if (parseInt(quantity) > 4) {
      return res.status(400).json({
        message: "Quantity is higher",
        statusCode: 400,
      });
    }

    const createReward = {
      sender_id: id,
      receiver_id:receiverId,
      quantity,
      note,
    };
    await Reward.create(createReward);
    res.status(201).json({
      message: "Reward request created successfully",
      statusCode: 201,
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Error creating Reward: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

/**
 *  @description  Get all rewards
 *  @route        GET /api/lunch/:params/:id
 *  @access       Public
 *
 */

// 2. get all rewards

const getAllReward = async (req, res) => {
  try {
    const { id } = req.body.user;
    let rewardReceived = await Reward.findAll({ where: { receiverId: id } });
    let rewardSent = await Reward.findAll({ where: { senderId: id } });

    const reward = [...rewardReceived, ...rewardSent];

    //check if any rewards exist
    if (reward.length === 0) {
      return res.status(404).json({
        message: "No Reward for User",
        statusCode: 404,
        data: null,
      });
    }

    // Respond with the fetched rewards
    return res.status(200).json({
      message: "Reward request fetched successfully",
      statusCode: 200,
      data: reward,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching Reward: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

/**
 *  @description  Get a single reward
 *  @route        GET /api/lunch/:id
 *  @access       Public
 *
 */

// 3. get single reward

const getOneReward = async (req, res) => {
  try {
    const { id } = req.user;
    const { org_id } = await User.findOne({ where: { id: id } });
    const paramsId = req.params.id;
    const reward = await Reward.findOne({
      where: {
        [Op.or]: [
          { receiver_id: id, org_id, id: paramsId },
          { sender_id: id, org_id, id: paramsId },
        ],
      },
    });
    if (!reward) {
      return res.status(404).json({
        message: "No Reward Found",
        statusCode: 404,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Reward fetched successfully",
      statusCode: 200,
      data: reward,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching Reward: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

module.exports = {
  addReward,
  getAllReward,
  getOneReward,
};
