const createServer = require("http").createServer;
const app = require("./app");
const db = require("./configs/dbConfig");
const PORT = process.env.PORT || 7001;

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Connect to database
db.authenticate().then(() => {
  console.log("Connected to the database successfully");
}).catch(err => {
  console.log("Failed to connect to the database:", err);
});