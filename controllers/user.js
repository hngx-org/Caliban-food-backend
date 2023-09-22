const { Lunches } = require("../models");
const { User } = require("../models");

const Reward = Lunches;
const { signupUser, loginUser } = require("../services/user");

// Controller function for user signup
async function userSignup(req, res, next) {
  try {
    const { email, password, phone, firstName, lastName } = req.body;

    // Call the signupUser service function
    await signupUser({
      email,
      password,
      phone,
      firstName,
      lastName,
    });

    // const formattedUser = {
    //   email: user.email,
    //   phone: user.phone,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    res.status(201).json({ success: "User created Successfully" });
  } catch (error) {
    next(error);
  }
}

// Controller function for user login
async function userLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    // Call the loginUser service function
    const { user, token } = await loginUser({ email, password });

    // Return a success response with user data and JWT token
    res.status(200).json({ success: true, token });
  } catch (error) {
    // Handle any errors that occurred during login
    next(error);
  }
}

const redeemLunch = async (req, res) => {
  try {
    const { id } = req.user;
    const { org_id, lunch_credit_balance } = await User.findOne({
      where: { id: id },
    });

    const { ids } = req.body; // Assuming you expect an object with an "ids" property containing an array of IDs

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid request body. 'ids' must be an array.",
        statusCode: 400,
        data: null,
      });
    }
    let errorSeen = [];
    for (const paramsId of ids) {
      const hello = await checkValid(id, org_id, paramsId);
      if (!hello) {
        errorSeen.push(true);
        break;
      }
    }
    if (errorSeen.includes(true)) {
      return res.status(404).json({
        message: "Reward not found.",
        statusCode: 404,
        data: null,
      });
    }
    const redeemed = [];
    for (const paramsId of ids) {
      const redeemedIds = await checkRedeemed(id, org_id, paramsId);
      if (redeemedIds) {
        redeemed.push(true);
        break;
      }
    }
    if (redeemed.includes(true)) {
      return res.status(400).json({
        message: "Reward already redeemed",
        statusCode: 400,
        data: null,
      });
    }
    let quantityArray = [];
    for (const paramsId of ids) {
      const hello = await updateReward(id, org_id, paramsId);
      quantityArray.push(hello);
    }

    const quantity = quantityArray.reduce((prev, current) => prev + current);
    const newPrice = lunch_credit_balance + quantity;
    await User.update(
      { lunch_credit_balance: newPrice },
      { where: { id: id } }
    );
    return res.status(200).json({
      message: "Lunch rewards redeemed successfully",
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

async function checkValid(id, org_id, paramsId) {
  const checkReward = await Reward.findOne({
    where: {
      receiver_id: id,
      org_id,
      id: paramsId,
    },
  });
  if (!checkReward) {
    return false;
  }
  return true;
}
async function checkRedeemed(id, org_id, paramsId) {
  const checkReward = await Reward.findOne({
    where: {
      receiver_id: id,
      org_id,
      id: paramsId,
    },
  });
  if (checkReward.redeemed === true) {
    return true;
  }
  return false;
}
async function updateReward(id, org_id, paramsId) {
  const reward = await Reward.findOne({
    where: {
      receiver_id: id,
      org_id,
      id: paramsId,
    },
  });
  await Reward.update(
    { redeemed: true },
    {
      where: {
        receiver_id: id,
        org_id,
        id: paramsId,
      },
    }
  );
  return reward.quantity;
}

module.exports = {
  userSignup,
  userLogin,
  redeemLunch,
};
