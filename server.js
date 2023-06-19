const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

app.use(cors());
const bodyparser = require("body-parser");
const users = require("./schemamodels/userModel.js");
const jwt = require("jsonwebtoken");
const app = express();
const middleware = require("./middlewares/middleware.js");
const anwserModel = require("./schemamodels/anwserModel.js");

const commentModel = require("./schemamodels/commentModel.js");
const voteModel = require("./schemamodels/voteModel.js");
const questions = require("./schemamodels/questionModel.js");
const url =
  "mongodb+srv://raghukiran1414:Raghu%40123@cluster0.m82pxwz.mongodb.net/stackoverflowclone?retryWrites=true&w=majority";

app.use(bodyparser.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Welcome to Stackoverflow server");
});
app.get("/homepage", (req, res) => {
  res.send("Welcome to Home");
});
app.post("/registration", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const exist = await users.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already registered");
    }

    let newUser = new users({
      fullname,
      email,
      password,
    });
    newUser.save();
    return res.status(200).send("User registered");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingemail = await users.findOne({ email: email });
    // console.log("entered login route");
    if (!existingemail) {
      return res.status(400).send("User not exist");
    }
    if (existingemail.password != password) {
      return res.status(400).send("Password is invalid");
    }

    const payload = {
      user: {
        id: existingemail.id,
      },
    };

    jwt.sign(payload, "jwtpassword", { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/addquestion", middleware, async (req, res) => {
  try {
    const { title, body, user_id, tags, anwsers_count } = req.body;
    // console.log(req.body);
    const exist = await users.findById(req.user.id);
    const newquestion = new questions({
      title,
      body,
      user_id: exist.id,
      tags,
      anwsers_count: 0,
    });
    newquestion.save();
    return res.status(200).send("New Question Added");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.get("/allquestions", middleware, async (req, res) => {
  try {
    let allquestions = await questions.find();
    return res.json(allquestions);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.get("/myquestions", middleware, async (req, res) => {
  try {
    let myquestions = await questions.find({ user_id: req.user.id });
    return res.json(myquestions);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.get("/allusers", middleware, async (req, res) => {
  try {
    let allprofiles = await users.find();
    return res.json(allprofiles);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.get("/allanwsers/:q_id", middleware, async (req, res) => {
  try {
    let allanwsers = await anwserModel.find({ question_id: req.params.q_id });
    return res.json(allanwsers);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.post("/addanwser", middleware, async (req, res) => {
  try {
    const { body, user_id, question_id } = req.body;
    console.log(req.body);
    const user = await users.findById(req.user.id);
    const newAnwsers = new anwserModel({
      body,
      user_id: req.user.id,
      question_id,
    });
    newAnwsers.save();
    return res.status(200).send("New Anwser Added");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.post("/addcomment", middleware, async (req, res) => {
  try {
    const { body, user_id, question_id, anwser_id } = req.body;
    console.log(req.body);
    const user = await users.findById(req.user.id);
    const newComments = new commentModel({
      body,
      user_id: req.user.id,
      question_id,
      anwser_id,
    });
    newComments.save();
    return res.status(200).send("New Comment Added");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.post("/addvote", middleware, async (req, res) => {
  try {
    const { user_id, question_id, anwser_id, value } = req.body;
    console.log(req.body);
    const user = await users.findById(req.user.id);
    const newvotes = new voteModel({
      user_id: req.user.id,
      question_id,
      anwser_id,
    });
    newvotes.save();
    return res.status(200).send("New Comment Added");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});
app.listen(8022, () => {
  console.log("listening on port 8021");
});
