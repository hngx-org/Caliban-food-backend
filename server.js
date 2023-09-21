const createServer = require("http").createServer;
const app = require("./app");
const PORT = process.env.PORT || 7001;

const server = createServer(app);

require("./configs/dbConfig");
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});