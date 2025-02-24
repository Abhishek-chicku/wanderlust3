 const express = require("express");
 const router  = express.Router();
 const User = require("../models/user.js");
 const wrapAsync = require("../utils/wrapAsyc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");



router.route("/signup")
.get(userControllers.renderSignupform)
.post(wrapAsync(userControllers.signUp));


router.route("/login")
.get(userControllers.renderLoginform)
.post(saveRedirectUrl, passport.authenticate("local",
    { failureRedirect: '/login' , failureFlash : true }) ,userControllers.login)

    

//  router.get("/login",userControllers.renderLoginform);

//  router.post("/login",saveRedirectUrl, passport.authenticate("local",
//   { failureRedirect: '/login' , failureFlash : true }) ,userControllers.login);

 router.get("/logout" , userControllers.logout);

 module.exports =  router;