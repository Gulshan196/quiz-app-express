const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    question: {
        type:String,
        require: true
    }
    ,
    options : {
        type:Array,
        require:true
    }
    ,
    correct_ans : {
        type:String,
        require:true
    }
    ,
    difficulty : {
       type : Number , 
       require : true 
    }
    
})

const questionModel = mongoose.model("questions",questionSchema);
module.exports = questionModel;