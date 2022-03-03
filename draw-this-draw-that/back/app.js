const app = require("express")();
app.get("/", (req, res) => {
  res.send("hello world");
});
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8080;
const players = [];
let score = 0;
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("submit-name", ({ name }) => {
    if (players.length === 2) return;
    socket.name = name;
    players.push(socket);
    const load = players.length === 1;
    io.emit("name-submitted", {
      load,
      players: players.map(({ name }) => name),
    });
  });

  socket.on("submit-draw", (data) => {
    if (players[0] === socket) {
      players[1].emit("guess-now", data);
    } else players[0].emit("guess-now", data);
  });

  socket.on("change-score", ({ level }) => {
    if (level === "easy") {
      score += 1;
    } else if (level === "medium") {
      score += 3;
    } else if (level === "hard") {
      score += 5;
    }
    io.emit("update-score", { score });
  });

  socket.on("disconnect", (socket) => {
    io.emit("left-game", socket);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
