const db = require("../models/index");

// create main Model
const Lunch = db.models.lunch;

// 1. create Lunch

const addLunch = async (req, res) => {
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

    const createLunch = {
      senderId,
      receiverId,
      quantity,
      note,
    };
    await Lunch.create(createLunch);
    res.status(201).json({
      message: "Lunch request created successfully",
      statusCode: 201,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error creating Lunch: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

// 2. get all lunch

const getAllLunch = async (req, res) => {
  try {
    //collect the role and id from the request parameters
  
    const {role, id} = req.params

    // write a validator
    //cojoin to role from the parameterand Id string to find a dynamic key

    const roleId = `${role}Id`
    //using object literal to find a lunch using the id
    let lunch = await Lunch.findAll({ where: { [roleId]: id } });
    if (lunch.length === 0) {
      return res.status(404).json({
        message: "No Lunch for User",
        statusCode: 404,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Lunch request fetched successfully",
      statusCode: 200,
      data: lunch,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching Lunch: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

// 3. get single Lunch

const getOneLunch = async (req, res) => {
  try {
    const id = req.params.id;
    let lunch = await Lunch.findOne({ where: { id: id } });
    if (!lunch) {
      return res.status(404).json({
        message: "No Lunch Found",
        statusCode: 404,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Lunch fetched successfully",
      statusCode: 200,
      data: lunch,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching Lunch: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

// 4. redeem Lunch
// to change the boolen from true to false after the Lunch has been redeem

const updateLunch = async (req, res) => {
  try {
    const id = req.params.id;
    let lunch = await Lunch.findOne({ where: { id: id } });
    if (!lunch) {
      return res.status(404).json({
        message: "No Lunch Found",
        statusCode: 404,
        data: null,
      });
    }
    if (lunch.redeemed === true) {
      return res.status(400).json({
        message: "Lunch already Redeemed",
        statusCode: 400,
        data: null,
      });
    }
    // this place should change to true once we hit the route
    // const Lunch = await Lunch.update(req.body, { where: { id: id } });
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
  addLunch,
  getAllLunch,
  getOneLunch,
  updateLunch,
};
