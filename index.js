const express = require("express");
const app = express();
const db = require("./Database/database");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
const cors = require("cors");



app.use(cors({
  origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./Routes/question_route");

const user_router = require("./Routes/users_route");

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/ques", router);

app.use("/users",user_router);

app.listen(process.env.PORT || 8000, () => {
  console.log(`app running on port 8000`);
});
