const { MSG_TYPES } = require("./msgTypes");

function JsonResponse(res, status, msg, data = null, meta = null) {
  const body = {
    // msg: '',
    data: null,
    meta: {
      total: 1,
      pagination: {
        pageSize: 1,
        page: 1,
        // currentPage: 1,
      },
    },
  };

  if (data) {
    body.data = data;
  }
  if (meta) {
    body.meta = meta;
  } else {
    delete body.meta;
  }

  if (typeof msg === "string") {
    // eslint-disable-next-line no-shadow
    const data = MSG_TYPES[msg];
    if (typeof data !== "undefined") {
      // eslint-disable-next-line no-undef
      body.message = MSG_ERRORS[msg];
    } else {
      body.message = msg;
    }
  }
  res.status(status).send(body);
  // eslint-disable-next-line no-useless-return
  return;
}

function SocketResponse(error, msg, data = null, meta = null) {
  return { error, msg, data, meta };
}

module.exports = {
  JsonResponse,
  SocketResponse,
};
