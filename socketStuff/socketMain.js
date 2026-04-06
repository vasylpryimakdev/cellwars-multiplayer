const io = require("../servers").io;
const app = require("../servers").app;

const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");
const Orb = require("./classes/Orb");

const orbs = [];
const settings = {
  defaultNumberOfOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
  defaultGenericOrbSize: 5,
};
const players = [];

let tickTockInterval;

initGame();

io.on("connection", (socket) => {
  let player = {};

  socket.on("init", (playerObj, ackCallback) => {
    if (players.length === 0) {
      tickTockInterval = setInterval(() => {
        io.to("game").emit("tick", playersForUsers);
      }, 33);
    }

    socket.join("game");
    const playerName = playerObj.playerName;
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    players.push(player);

    ackCallback(orbs);
  });

  socket.on("tock", (data) => {
    //a tock has come in before the player is set up.
    //this is because the client kept tocking after disconnect
    if (!player.playerConfig) {
      return;
    }
    speed = player.playerConfig.speed;
    const xV = (player.playerConfig.xVector = data.xVector);
    const yV = (player.playerConfig.yVector = data.yVector);

    //if player can move in the x, move
    if (
      (player.playerData.locX > 5 && xV < 0) ||
      (player.playerData.locX < settings.worldWidth && xV > 0)
    ) {
      player.playerData.locX += speed * xV;
    }
    //if player can move in the y, move
    if (
      (player.playerData.locY > 5 && yV > 0) ||
      (player.playerData.locY < settings.worldHeight && yV < 0)
    ) {
      player.playerData.locY -= speed * yV;
    }

    //check for the tocking player to hit orbs
    const capturedOrbI = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings,
    );

    if (capturedOrbI !== null) {
      orbs.splice(capturedOrbI, 1, new Orb(settings));

      const orbData = {
        capturedOrbI,
        newOrb: orbs[capturedOrbI],
      };

      io.to("game").emit("orbSwitch", orbData);
      io.to("game").emit("updateLeaderBoard", getLeaderBoard());
    }

    const absorbData = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      playersForUsers,
      socket.id,
    );
    if (absorbData) {
      io.to("game").emit("playerAbsorbed", absorbData);
      io.to("game").emit("updateLeaderBoard", getLeaderBoard());
    }
  });

  socket.on("disconnect", (reason) => {
    if (players.length === 0) {
      clearInterval(tickTockInterval);
    }
  });
});

function initGame() {
  //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
  for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
