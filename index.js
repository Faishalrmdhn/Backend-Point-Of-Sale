const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser"); //middleware/menangkap data pada postman
const morgan = require("morgan"); //melihat aktivitas user (post/get/delete/patch)
const cors = require("cors");
const routerNavigation = require("./src");

const app = express();
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

app.listen(3001, "127.0.0.1", () => {
  console.log("Express app is listening on Host: 127.0.0.1 and port: 3001");
});
