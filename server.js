const express = require("express");
const server = express();
const PORT = process.env.PORT || 9876;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const CSR = require("./models/CrowdSourceRequest");
mongoose.connect("mongodb://localhost/Brookdale_Crowd");

server.set("view engine", "ejs");
server.set("views", "./views");
server.use(logger("dev"));
server.use(bodyParser.urlencoded({ extended: false }));

// const myRequest = new CSR({ name: "Tanner", age: 34 });
// myRequest.save().then(data => console.log(data));

server.use(express.static("./public"));

// server.get("/", function(req, res) {
//   res.render("index");
// });

server.get("/", (req, res) => {
  CSR.find((err, foundRequests) => {
    // console.log(data);
    if (!foundRequests) {
      foundRequests = { name: "none found" };
    }
    res.render("index", { requests: foundRequests });
  }).catch(err => console.log("there was an error"));
});

server.post("/create_new", (req, res) => {
  const newCSR = new CSR(req.body);
  newCSR.save().then(data => {
    res.redirect("/");
  });
});
 
server.post("/fund_request/:id", (req, res) => {
  const CSRId = req.params.id;
  const newFunding = req.body;

  CSR.findByIdAndUpdate(
    { _id: CSRId },
    { $push: { CONTRIBUTIONS: newFunding } },
    { new: true },
    (err, updatedRequest) => {
      console.log(updatedRequest);
      res.redirect("/");
    }
  );
  console.log(newFunding, CSRId);
});
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
