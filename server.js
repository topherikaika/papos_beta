const { MongoClient } = require("mongodb");
const express = require("express");
const multer = require("multer");
const upload = multer();
const sanitizeHTML = require("sanitize-html");
let db;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function passwordProtected(req, res, next) {
  res.set("WWW-Authenticate", "Basic realm='Our MERN App'");
  if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
    next();
  } else {
    console.log(req.headers.authorization);
    res.status(401).send("Try again");
  }
}

app.get("/", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  console.log(allRecipes);
  res.render("home", { allRecipes });
});

app.use(passwordProtected);

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/api/recipes", async (req, res) => {
  const allRecipes = await db.collection("recipes").find().toArray();
  res.json(allRecipes);
});

app.post("/create-recipe", upload.single("photo"), ourCleanup, async (req, res) => {
  console.log(req.body);
  const info = await db.collection("recipes").insertOne(req.cleanData);
  const newRecipe = await db.collection("recipes").findOne({ _id: new ObjectId(info.insertedId) });
  res.send(newRecipe);
});

function ourCleanup(req, res, next) {
  if (typeof req.body.name != "string") req.body.name = "";
  if (typeof req.body.type != "string") req.body.type = "";
  if (typeof req.body._id != "string") req.body._id = "";

  req.cleanData = {
    name: sanitizeHTML(req.body.name.trim(), { allowedTags: [], allowedAttributes: {} }),
    type: sanitizeHTML(req.body.type.trim(), { allowedTags: [], allowedAttributes: {} })
  };

  next();
}

async function start() {
  const client = new MongoClient("mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin");
  await client.connect();
  db = client.db();
  app.listen(3000);
}

start();
