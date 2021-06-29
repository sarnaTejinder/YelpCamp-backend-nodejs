const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// GET ALL CAMPGROUNDS
router.get("/all", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
});

// router.get("/new", (req, res) => {
//   res.render("new");
// });

// GET CAMPGROUNDS IN A LIMIT FOR INFINITE SCROLL
router.get("/:limit", async (req, res) => {
  const campgrounds = await Campground.find({}, null, {
    limit: parseInt(req.params.limit),
  });
  res.json(campgrounds);
});

// POST TO CREATE A NEW CAMPGROUND
router.post("/new", async (req, res) => {
  const camp = new Campground({ ...req.body });
  await camp.save();
  res.json(camp);
});

// POST TO EDIT A CAMPGROUND
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findByIdAndUpdate(id, { ...req.body });
  res.json(camp);
});

// DELETE CAMPGROUND USING ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findByIdAndDelete(id);
  res.json(camp);
});

module.exports = router;
