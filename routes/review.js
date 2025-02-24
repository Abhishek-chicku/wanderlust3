 const express = require("express");
 const router  = express.Router({mergeParams: true});
 const wrapAsync = require("../utils/wrapAsyc.js");
 const ExpressError = require("../utils/ExpressError.js");
 const Review = require("../models/review.js");
 const Listing=require("../models/listing.js");
 const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");
 const reviewController = require("../controllers/review.js");

 //Reviews
//Post review route
router.post("/" ,isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
 
 
 // Delete Review Route
 router.delete("/:reviewId", isLoggedIn , isreviewAuthor, wrapAsync(reviewController.destroyReview));

 module.exports = router;