const express = require("express");

const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const multer = require("multer");
const app = express();
const port = 5000;
require("dotenv").config();
app.use(cors());

const mongodb = `mongodb+srv://douzo_se:${process.env.MG_PASSWORD}@se.iqrfat1.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "authentication";
let db;
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
  MongoClient.connect(mongodb, (err, client) => {
    db = client.db(dbName);
    console.log("connected to database");
  });
});
