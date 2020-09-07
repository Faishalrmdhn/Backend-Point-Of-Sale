const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "onlineshop",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now Connected!...");
});

module.exports = connection;
