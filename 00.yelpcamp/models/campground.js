var mongoose = require("mongoose");

//set up database schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//compile into model

module.exports = mongoose.model("Campground", campgroundSchema);