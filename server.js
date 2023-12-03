const { MongoClient } = require("mongodb");
const express = require("express");
let db;

const app = express();

app.get("/", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  console.log(allRecipes);
  res.send(`<h1>Welcome to the page</h1>${allRecipes.map(recipe => `<p>${recipe.name} - ${recipe.type}</p>`).join("")}`);
});

app.get("/admin", (req, res) => {
  res.send("This is the admin page");
});

async function start() {
  const client = new MongoClient("mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin");
  await client.connect();
  db = client.db();
  app.listen(3000);
}

start();
