var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground");
// Comment = require("./models/comment"),
// User = require("./models/user");
// connet to database
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");



//create a database file
// Campground.create(
//     {
//         name:"Salmon Creek",
//         image:"https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//         description:"Lorem ipsum dolor sit amet, ad vis tractatos argumentum"
//     }, function(err, camp){
//         if(err){
//             console.log(err)
//         }else {
//             console.log("new created campground")
//             console.log(camp)
//         }
//     }
//     );

//routes

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  //get all campgrounds from db then render
  Campground.find({}, function (err, allCamp) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCamp });
    }
  });
});

app.post("/campgrounds", function (req, res) {
  // res.send("you hit the post route")
  //add data from form and add to our campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampgrounds = { name: name, image: image, description: desc };
  // create new campground and save to database
  Campground.create(newCampgrounds, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
  // riderect back to campgrounds page
});

//new  show form to create campgound
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

//show more info about a campground
app.get("/campgrounds/:id", function (req, res) {
  //find the compground with provided id
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
  // req.params.id;
});

app.listen(3000, function () {
  console.log("server started");
});
