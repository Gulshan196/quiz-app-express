const express = require("express");
const router = express.Router();

const Question = require("../Controller/question_controller");

router.post("/add", Question.addQuestions);

router.get("/getall", Question.getQuestion);

module.exports = router;
