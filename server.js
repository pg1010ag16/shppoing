// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Server is Shutting Down DUE TO Uncaught Exception");
  process.exit(1);
});

const app = require("./app");

// DB Connectivity
const db = require("./db");
(async () => {
  await db();
})();

const PORT = 8080;

let server =  app.listen(PORT, () => {
  // console.clear();
  console.log(`Server is running on port: ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log("Server is Shutting Down DUE TO Unhandled Rejection");
    process.exit();
  });
});
