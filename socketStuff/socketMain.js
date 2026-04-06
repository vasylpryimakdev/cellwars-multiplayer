const io = require("../servers").io;
const app = require("../servers").app;

const settings = {
  defaultNumberOfOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
  defaultGenericOrbSize: 5,
};

const Orb = require("./classes/Orb");

const orbs = [];

initGame();

io.on("connection", (socket) => {
  socket.emit("init", {
    orbs,
  });
});

function initGame() {
  //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
