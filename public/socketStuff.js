const socket = io.connect("http://localhost:5000");

const init = async () => {
  //init is called inside of start-game click listener
  const initData = await socket.emitWithAck("init", {
    playerName: player.name,
  });

  orbs = initData;

  draw();
};

socket.on("initReturn", (initData) => {});
