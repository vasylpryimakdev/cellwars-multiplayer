const socket = io.connect("http://localhost:5000");

socket.on("init", (initData) => {
  orbs = initData.orbs;
});
