const express = require("express");
const router = express.Router();

const Authentication = require("../Controller/authentication");
const Authorization = require("../Middleware/authorization");

router.post("/register",Authentication.prototype.UserRegistration);

router.post("/login", Authentication.prototype.UserLogin);

// protected route

router.get("/dashboard", Authorization.checkUserAuth,(req,res)=>{
    res.send(req.user_data);
});

module.exports = router;