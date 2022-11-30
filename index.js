const express = require("express");
const app = express();
const port = 8000;
const db = require("./Database/database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./Route/question_route");

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/ques", router);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
