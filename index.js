const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser"); //middleware/menangkap data pada postman
const morgan = require("morgan"); //melihat aktivitas user (post/get/delete/patch)
const cors = require("cors");
const routerNavigation = require("./src");

const app = express();
// =======================================================
// const socket = require("socket.io");
// =======================================================
// =======================================================
// const http = require("http");
// const server = http.createServer(app);
// const io = socket(server);

// io.on("connection", (socket) => {
//   console.log("Socket.io connected...");
//   socket.on("globalMessage", (data) => {
//     io.emit("chatMessage", data);
//   });

//   socket.on("privateMessage", (data) => {
//     socket.emit("chatMessage", data);
//   });

//   socket.on("broadcastMessage", (data) => {
//     console.log(data);
//     socket.broadcast.emit("chatMessage", data);
//   });

//   socket.on("welcomeMessage", (data) => {
//     socket.emit("chatMessage", {
//       user_name: "BOTMEE6",
//       message: `Welcome back ${data.user_name}!`,
//     });

//     socket.broadcast.emit("chatMessage", {
//       user_name: "BOTMEE6",
//       message: `${data.user_name} has joined the chat`,
//     });
//   });

//   // spesifik
//   socket.on("'typing", (data) => {
//     socket.broadcast.emit("typingMessage", data);
//   });

//   socket.join(data.room);
// });
// =======================================================

app.use(cors());
app.use(bodyParser.json()); //mengambi data pada raw/json
app.use(bodyParser.urlencoded({ extended: false })); //mengambil data pada body url
app.use(morgan("dev")); //dev = format
app.use(express.static("uploads"));
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Controll-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", routerNavigation);
app.get("*", (request, response) => {
  response.status(404).send("Path Not Found");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `Express app is listening on Host: ${process.env.IP} and port: ${process.env.PORT}`
  );
});
// =======================================================

// server.listen(3000, () => {
//   console.log("listening on port 3000");
// });
// =======================================================
