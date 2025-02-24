const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userschema = new Schema({
    email : {
             type:String,
             require :true
    }

});
userschema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userschema);
