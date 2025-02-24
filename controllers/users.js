const User = require("../models/user.js");


module.exports.renderSignupform = (req,res)=>{
    res.render("users/signup.ejs");
 };

module.exports.signUp = async(req,res)=>{
   try{
      let {username,email , password} = req.body;
   const newUser = new User ({email , username});
   let registereduser = await User.register(newUser , password);
   console.log(registereduser);
   req.login(registereduser , (err)=>{
      if(err) {
         return next(err);
      }
      req.flash("success" , "Welcome to Wanderlust!");
      res.redirect("/listings");
   })

   } catch(e){
      req.flash("error" , e.message);
      res.redirect("./signup");
   }
 };


 
module.exports.renderLoginform = (req , res)=>{
    res.render("users/login.ejs");
  };


  module.exports.login =  async(req,res)=>{
    req.flash("success" , "Welcome to Back Wanderlust!");
    let RedirectURL = res.locals.redirectUrl || ("./listings");
    res.redirect(RedirectURL);
  };

  module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
   if(err){
       return next(err);
   }
   req.flash("success" , "you are Logged out!");
   res.redirect("/listings");
 })
 };
