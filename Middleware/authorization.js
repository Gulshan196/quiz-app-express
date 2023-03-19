const jwt = require("jsonwebtoken");
const userModel = require("../Model/user_schema");

class Authorization {
    static checkUserAuth = async(req,res,next) =>{
     let token;
     const{authorization} = req.headers;

     if(authorization && authorization.startsWith('Bearer')){

        try{
            token = authorization.split(' ')[1];

            const {email} = jwt.verify(token ,process.env.SECRET_KEY);

            req.user_data = await userModel.findOne({email:email});

            next();
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
     }
     else {
        res.send("token not found");
     }

     
    }
}

module.exports = Authorization;