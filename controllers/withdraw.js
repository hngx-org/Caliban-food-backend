const { withdraw } = require("../services/withdraw");
// Controller function for withdrawal
async function makeWithdrawal(req, res, next) {
  try {
    const { amount, user_id } = req.body;
    // Call the withdraw service function
    const { withdrawal } = await withdraw({
      user_id,
      status: "success",
      amount,
    });
    // Return a success response with withdrawal data
    res.status(201).json({ success: true, withdrawal });
  } catch (error) {
    // Handle any errors that occurred during withdrawal
    next(error);
  }
}
module.exports = {
  makeWithdrawal
}