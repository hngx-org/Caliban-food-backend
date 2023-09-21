// Import the createServer function from the built-in "http" module
const createServer = require("http").createServer;

// Import the Express.js application instance from the "./app" module
const app = require("./app");
<<<<<<< HEAD

// Define the port number for the server to listen on, with a fallback to 7001 if not specified in the environment variables
const PORT = process.env.PORT || 7001;
=======
const PORT = process.env.PORT || 6001;
>>>>>>> a980ef5b14d29c46486a36c41a694afe47ea0766

// Create an HTTP server instance using the Express application
const server = createServer(app);

// Start the server and listen on the specified port
server.listen(PORT, () => {
  // Log a message indicating that the server is running and on which port
  console.log(`Server is running on port ${PORT}`);
});
