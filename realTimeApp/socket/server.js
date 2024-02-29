const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];
console.log("socket server started");
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

io.on("connection", (socket) => {
  // When a user connects
  console.log("A user connected.");

  // Take userId and socketId from the user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and get messages
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });

  socket.on("notification", (otherUsers) => {
    console.log(otherUsers);
    for (let user of otherUsers) {
      io.to(user.socketId).emit("notification", "notification received");
    }
  });
  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
