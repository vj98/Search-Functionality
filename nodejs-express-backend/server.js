var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});

// connection configurations
var dbConn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// // connect to database
dbConn.connect();

// // Retrieve all users
app.get("/list", function (req, res) {
  dbConn.query("SELECT * FROM test_data", function (error, results, fields) {
    if (error) throw error;
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, OPTIONS"
    );
    return res.send({ error: false, data: results, message: "users list." });
  });
});

// set port
app.listen(5000, function () {
  console.log("Node app is running on port 5000");
});

module.exports = app;
