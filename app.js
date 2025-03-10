if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

console.log(process.env.SECRET);


const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const req = require("express/lib/request.js");
const wrapAsync = require("./utils/wrapAsyc.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema}=require("./schema.js");
const Review = require("./models/review.js");
const session =  require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User =  require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const env = require('dotenv').config();

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// const MONGO_URL='mongodb://127.0.0.1:27017/hyper';
const dburl = process.env.ATLAS_URL;

main()
.then(()=>{
    console.log("connect to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dburl);
}


const store = MongoStore.create({
    mongoUrl: dburl ,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600 ,
  })


  store.on("error",()=>{
    console.log("error in mongo store",err);
  });

//session
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false , 
    saveUninitialized : true, 
    cookie :{
    expires :Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge :  7 * 24 * 60 * 60 * 1000 ,
    httpOnly : true,
    },
    };

    // app.get("/",(req,res)=>{
    //     res.send("successful");
    // });


    app.use(session(sessionOptions));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));


    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    
    app.use((req , res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUSer = req.user;
    next();
    });


    // app.get("/userdemo", async(req,res)=>{
    //     let fakedemo = new User ({
    //         email:"as340490@gmail.com",
    //         username:"Abhishek singh",
    //     })
    //  let registereduser = await User.register(fakedemo,"helloworld");
    //  res.send(registereduser);
    // });

    
app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);

app.use("/" ,userRouter);

//Middleware
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found...!"));
})

app.use((err,req,res,next)=>{
let{Statuscode=500,message="Something Went Wrong!"} = err;
//res.status(Statuscode).send(message);
res.status(Statuscode).render("error.ejs",{message});
});

app.listen(8989,()=>{
    console.log("port is listening");
});