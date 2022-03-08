const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//require schema
//models
const TodoTask = require("./models/TodoTask");

//hide super secret mongo db
dotenv.config();


//link css
app.use("/static", express.static("public"));

//extract data from form 
app.use(express.urlencoded({ extended: true }));


//connection to db
  mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
    });

//set up ejs
app.set("view engine", "ejs");


// GET METHOD
app.get("/", (req, res) => {
  res.render("todo.ejs");
  });


//POST METHOD
app.post('/',async (req, res) => {

  //add button inserts new data in db
  const todoTask = new TodoTask({
  content: req.body.content
  });
  try {
  await todoTask.save();
  res.redirect("/");
  } catch (err) {
  res.redirect("/");
  }
  });