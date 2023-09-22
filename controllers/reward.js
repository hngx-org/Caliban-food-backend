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
    const { id } = req.user;
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
      receiver_id: receiverId,
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
    const { id } = req.user;
    const { org_id } = await User.findOne({ where: { id: id } });
    const reward = await Reward.findAll({
      where: {
        [Op.or]: [
          { receiver_id: id, org_id },
          { sender_id: id, org_id },
        ],
      },
    });

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

/**
 *  @description  Redeem a single reward and add the redeemed to the user lunch_credit
 *  @route        GET /api/redeem/:id
 *  @access       Public
 *
 */

// 4. get single reward and redeem it

const redeemLunch = async (req, res) => {
  try {
    const { id } = req.user;
    const { org_id, lunch_credit_balance } = await User.findOne({
      where: { id: id },
    });
    const paramsId = req.params.id;
    const checkReward = await Reward.findOne({
      where: {
        receiver_id: id,
        org_id,
        id: paramsId,
      },
    });
    if (!checkReward) {
      return res.status(404).json({
        message: "No Reward Found",
        statusCode: 404,
        data: null,
      });
    }
    if (checkReward.redeemed) {
      return res.status(400).json({
        message: "Reward Redeemed Already",
        statusCode: 400,
        data: null,
      });
    }
    const reward = await Reward.update(
      { redeemed: true },
      {
        where: {
          receiver_id: id,
          org_id,
          id: paramsId,
        },
      }
    );
    const newPrice = lunch_credit_balance + checkReward.quantity;
    await User.update(
      { lunch_credit_balance: newPrice },
      { where: { id: id } }
    );
    const updatedUser = await User.findOne({ where: { id: id } });
    return res.status(200).json({
      message: "Lunch redeemed successfully",
      statusCode: 200,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error redeeming Lunch: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

module.exports = {
  addReward,
  getAllReward,
  getOneReward,
  redeemLunch,
};
