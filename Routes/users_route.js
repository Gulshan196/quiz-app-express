const express = require("express");
const router = express.Router();

const Authentication = require("../Controller/authentication");

router.post("/register",Authentication.prototype.UserRegistration);

router.post("/login", Authentication.prototype.UserLogin);

module.exports = router;