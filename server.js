const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});

const io = socketio(server);

module.exports = {
  app,
  io,
};
