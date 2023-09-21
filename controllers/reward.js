const { Lunches } = require("../models");

// create main Model
const Reward = Lunches;

/**
 *  @description  Create reward
 *  @route        POST /api/lunch/send
 *  @access       Public
 *
 */

// 1. create reward

const addReward = async (req, res) => {
  try {
    const { senderId, receiverId, quantity, note } = req.body;
    if (isNaN(quantity)) {
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
      senderId,
      receiverId,
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
    res.status(500).json({
      message: `Error creating Reward: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

/**
 *  @description  Get all rewards
 *  @route        GET /api/lunch/all/
 *  @access       Public
 *
 */

// 2. get all rewards

const getAllReward = async (req, res) => {
  try {
    const { id } = req.body;
    let reward = await Reward.findAll({ where: { receiverId: id } });
    if (reward.length === 0) {
      return res.status(404).json({
        message: "No Reward for User",
        statusCode: 404,
        data: null,
      });
    }
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
    const id = req.params.id;
    let reward = await Reward.findOne({ where: { id: id } });
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
