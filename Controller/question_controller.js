const questionModel = require("../Model/question_schema");
class Question {
  constructor() {}
  static addQuestions = async (req, res) => {
    const { question, options, correct_ans , difficulty } = req.body;
    if (!question || !options || !correct_ans || !difficulty) {
      res.send("please provide all details of the question");
    }
    try {
      const ques = new questionModel({
        question: question,
        options: options,
        correct_ans: correct_ans,
        difficulty : difficulty
      });
      const answer = await ques.save();
      console.log(answer);
      res.send("question added!");
    } catch (err) {
      res.send(err);
    }
  };

  static getQuestion = async (req, res) => {
    try {
      let data = await questionModel.find();
      res.send({ questions: data });
    } catch (err) {
      res.send(err);
    }
  };

  static getRandomQuestion = async (req,res) =>{
    const {difficulty} = req.body;
 // define the difficulty level


// create the aggregation pipeline
const pipeline = [
  { $match: { difficulty: difficulty } },
  { $sample: { size: 1 } }
];

// execute the pipeline
let data = await questionModel.aggregate(pipeline
).exec();
  
res.send(data);
  }
}

module.exports = Question;
