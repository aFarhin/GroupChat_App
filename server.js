// Initialising all variables
const express = require("express");
// set's up our express -> express allows me to create a server.
const app = express();
// HTTP -> Hyper text transfer protocol -> Information exchange
const server = require("http").Server(app);

// Creating a medium/server to send and receives data
// index.html file from public
app.use(express.static("public"));

// socket io initialisaton - what is socket.
const io = require("socket.io")(server);
// socket.io and combining it with my server.

// socket io is my watchman, which keeps a register and tracks everyone.
// if anything happens, this watchman alerts everyone.

// a message is sent, so every one receive that message

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (data) => {
    // watchman emits to everyone
    io.emit("message", data);
    console.log("Message is being sent to everyone", data.message);
  });

  socket.on("username enter", (data) => {
    // watchman emits to everyone
    io.emit("username enter", data);
  });

  socket.on("username left", (data) => {
    io.emit("username left", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
