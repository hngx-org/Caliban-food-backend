const MSG_TYPES = Object.freeze({
  ACCOUNT_CREATED: "Account Successfully Created.",
  LOGGED_IN: "Successfully logged in",
  DELETED: "Resource Deleted Successfully",
  UPDATED: "Resource Updated Successfully",
  CREATED: "Resource Created Successfully",
  FETCHED: "Resource Fetched Successfully",
  ACCOUNT_VERIFIED: "Account Successfully Verified",
  ORDER_POSTED: "Order Successfully Posted",
  AWAIT_ADMIN:
    "Account successfully verified. Awaiting administrator verification.",
  ACCOUNT_EXIST: "Account already exist.",
  ACCOUNT_INVALID: "Invalid email or password",
  SUSPENDED: "Account is suspended!",
  INACTIVE: "Account is inactive!",
  DISABLED: "Account is disabled!",
  NOT_FOUND: "Not Found",
  UPLOAD_IMAGE: "Image upload is required.",
  ACCESS_DENIED: "Access denied.",
  SESSION_EXPIRED: "Access denied. Your session has expired",
  PERMISSION: "You don't have enough permission to perform this action",
  SERVER_ERROR: "Server Error!",
  ACCOUNT_DELETED: "Account no longer exists!",
  INVALID_PASSWORD: "Invalid Password",
  WALLET_FUNDED: "Your wallet has been funded",
  NOT_ALLOWED: "This operation is allowed",
});

module.exports = {
  MSG_TYPES,
};
