const mongoose = require("mongoose");

const CampgroundSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  description: String,
  contact: Number,
  image: String,
});

const Campground = mongoose.model("Campground", CampgroundSchema);
module.exports = Campground;
