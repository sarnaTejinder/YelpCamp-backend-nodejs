const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CampgroundRouter = require("./routes/campground");
const path = require("path");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/"));
app.use(methodOverride("_method"));
app.use("/campgrounds", CampgroundRouter);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("db connected");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
