const createServer = require("http").createServer;
const app = require("./app");
const PORT = process.env.PORT || 6001;

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
