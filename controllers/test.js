const test = async (req, res) => {
  try {
    return res.send("works");
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  test,
};
