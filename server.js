const express = require("express");
const server = express();
const PORT = process.env.PORT || 9876;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const BCR = require("./models/CrowdSourceRequest");
mongoose.connect("mongodb://localhost/Brookdale_Crowd");

server.set("view engine", "ejs");
server.set("views", "./views");
server.use(logger("dev"));
server.use(bodyParser.urlencoded({ extended: false }));

// const myRequest = new BCR({ name: "Tanner", age: 34 });
// myRequest.save().then(data => console.log(data));

server.use(express.static("./public"));

server.get("/", function(req, res) {
  res.render("index");
});

server.get("/home", (req, res) => {
  BCR.find((err, foundRequests) => {
    // console.log(data);
    if (!foundRequests) {
      foundRequests = { name: "none found" };
    }
    res.render("home", { requests: foundRequests });
  }).catch(err => console.log("there was an error"));
});

server.post("/create_new", (req, res) => {
  const newBCR = new BCR(req.body);
  newBCR.save().then(data => {
    res.redirect("/home");
  });
});

server.post("/fund_request/:id", (req, res) => {
  const BCRId = req.params.id;
  const newFunding = req.body;

  BCR.findByIdAndUpdate(
    { _id: BCRId },
    { $push: { contributions: newFunding } },
    { new: true },
    (err, updatedRequest) => {
      console.log(updatedRequest);
      res.redirect("/");
    }
  );
  console.log(newFunding, BCRId);
});
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
