const { Withdrawals, User } = require("../models");
const { v4: uuidv4 } = require('uuid');

async function withdraw({ amount, user_id }) {
  try {
    const user = await User.findOne({
      where: {
        id: user_id
      }
    });

    // const balance = user.lunch_credit_balance;
    // if (!(balance > (amt / 1000) || !(balance = (amt / 1000)))) {
    //   throw new Error({
    //     message: "You do not have enough balance for this withdrawal",
    //     status: "failed"
    //   });
    // }

    // Create a withdrawal request
    var created_at = new Date();

    const withdrawal = await Withdrawals.build({
      id: uuidv4(),
      user_id: user.id,
      status: "success",
      amount: amount,
      created_at: created_at
    });

    // Update user lunch credit balance
    // await User.update({
    //   lunch_credit_balance: (user.lunch_credit_balance - (amt / 1000))
    // },
    //   {
    //     where: { id: user_id }
    //   });

    return {
      message: "Withdrawal request created successfully",
      statusCode: 201,
      data: {
        id: withdrawal.id,
        user_id: user_id,
        status: "success", // the status should be updated from pending to successful state assuming we integrated a payment provider.
        amount: amount,
        created_at: withdrawal.created_at
      }
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  withdraw
};