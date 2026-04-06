const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static("./public"));

const server = app.listen(5000, () => {
  console.log("Server is running on port: http://localhost:5000");
});

const io = socketio(server);

module.exports = {
  app,
  io,
};
