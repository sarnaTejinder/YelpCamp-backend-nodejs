const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { first, second } = require("./seedHelpers");
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("db connected");
});

function rand(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const seedDb = async () => {
  console.log("hello");
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const price = Math.floor(Math.random() * 50);
    const image = await axios.get("https://picsum.photos/400");
    // console.dir(image.request.res.req.path);
    const newCamp = new Campground({
      title: `${rand(first)} ${rand(second)}`,
      location: `${rand(cities).city}, ${rand(cities).state}`,
      price,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      contact: 8851641925,
      image: `https://i.picsum.photos${image.request.res.req.path}`,
    });
    await newCamp.save();
  }
  console.log("completed");
};
seedDb().then(() => db.close());
