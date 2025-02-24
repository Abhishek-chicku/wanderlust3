  const express = require("express");
  const router  = express.Router();
  const wrapAsync = require("../utils/wrapAsyc.js");
  const Listing=require("../models/listing.js");
  const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
  const listingController = require ("../controllers/listing.js");
  const multer  = require('multer')
  const {storage} = require("../cloudconfig.js");
  const upload = multer({ storage});

  //Index Route

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing ,wrapAsync(listingController.createListing)
);


//new route

router.get("/new", isLoggedIn, listingController.renderNewForm);



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner ,wrapAsync(listingController.deleteListing)
)

//Show Route



//edit Route

router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.editForm));


//Update route



//Delete route



module.exports = router;