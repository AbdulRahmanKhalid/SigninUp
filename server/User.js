const mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
    email:String,
    name: String,
    password:String
  });
  var User = mongoose.model("User", nameSchema);