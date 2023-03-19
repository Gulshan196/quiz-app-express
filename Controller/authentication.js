const userModel = require("../Model/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
function Authentication() {

}

Authentication.prototype.UserRegistration = async(req,res) =>{
    const {name,email,password,confirm_password} = req.body; 
    if (!name || !email || !password || !confirm_password) {
    res.send("please fill all the fields!");
    }
    try {
    if (password === confirm_password) {
      let useremail = await userModel.findOne({email:email});
      if(!useremail){
       const salt = await bcrypt.genSalt(10);
       const hashpassword = await bcrypt.hash(password,salt);
       const usermodel = new userModel({
        name: name,
        email: email,
        password: hashpassword
       });
       await usermodel.save();

       res.send('user registered successfully');
      }
      else{
        res.send("email already exists");
      }
    }else{
        res.send("password and confirm password does not match");
    }
    }
    catch(err){
res.send(err);
    }
}


Authentication.prototype.UserLogin = async(req,res) => {
const {email , password} = req.body;

if (!email || !password){
    res.send("please enter both email and password");
}

try{
    let userdata = await userModel.findOne({email:email});
    console.log(userdata)
    if (userdata){
        let isMatch = await bcrypt.compare(password , userdata.password);
        if (userdata.email == email && isMatch){
            const token = jwt.sign({email : email},
                process.env.SECRET_KEY , {expiresIn: "4h"});

                res.send({token});
        }
        else {
            res.send("invalid credentials");
        }
    }
    else{
        res.send("you are not registered");
    }
    
}
catch(err){
    res.send(err);
}
} 

module.exports = Authentication;

