const { Lunches } = require("../models");
const { User } = require("../models");

const Reward = Lunches;
const { signupUser, loginUser } = require('../services/user');

// Controller function for user signup
async function userSignup(req, res, next) {
  try {
    const { email, password, orgId, firstName, lastName } = req.body;

    // Call the signupUser service function
    const { user, token } = await signupUser({
      email,
      password,
      orgId,
      firstName,
      lastName,
    });
    
      const formattedUser = {
        id: user.id,
        email: user.email,
        password_hash: user.password_hash,
        org_id: user.org_id,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
      
    res.status(201).json({ success: true, user: formattedUser, token });
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
    res.status(200).json({ success: true, user, token });
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
    

    // const missingRewards = [];

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid request body. 'ids' must be an array.",
        statusCode: 400,
        data: null,
      });
    }


for (const paramsId of ids) {
  const checkReward = await Reward.findOne({
    where: {
      receiver_id: id,
      org_id,
      id: paramsId,
    },
  });

  if(!checkReward) {
    res.json({message: "Not all rewards exist or match the provided ID"})
   }
  }



return;

    for (const paramsId of ids) {
      const checkReward = await Reward.findOne({
        where: {
          receiver_id: id,
          org_id,
          id: paramsId,
        },

        
      });



      if (!checkReward) {
        return res.status(404).json({
          message: `No Reward Found for ID ${paramsId}`,
          statusCode: 404,
          data: null,
        });
      }

      if (checkReward.redeemed) {
        return res.status(400).json({
          message: `Reward with ID ${paramsId} has already been redeemed`,
          statusCode: 400,
          data: null,
        });
      }

      // Redeem the reward for the current ID
      await Reward.update(
        { redeemed: true },
        {
          where: {
            receiver_id: id,
            org_id: org_id,
            id: paramsId,
          },
        }
      );

      // Update the lunch credit balance for the current ID
      const newPrice = lunch_credit_balance + checkReward.quantity;
      await User.update(
        { lunch_credit_balance: newPrice },
        { where: { id: id } }
      );
    }

    // Respond with a success message once all IDs are processed
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


module.exports = {
  userSignup,
  userLogin,
  redeemLunch,
};
