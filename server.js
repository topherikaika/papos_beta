const { MongoClient } = require("mongodb");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.get("/admin", (req, res) => {
  res.send("This is the admin page");
});

async function start() {
  const client = new MongoClient();
}

start();

app.listen(3000);
