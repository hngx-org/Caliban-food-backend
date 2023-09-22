const createServer = require("http").createServer;
const app = require("./app");
const dotenv = require('dotenv');
const { dbConnection } = require('./utils/database/dbConnection');

const PORT = process.env.PORT || 6001;
dotenv.config();


const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
<<<<<<< HEAD
});
=======

  // Establish the database connection
  dbConnection(process.env.DB_URL);
});
>>>>>>> origin/main
