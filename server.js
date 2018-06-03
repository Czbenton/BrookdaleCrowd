//Constants
const express = require("express");
const server = express();
const PORT = process.env.PORT || 9876;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const CSR = require("./models/CrowdSourceRequest");

//Middleware
mongoose.connect("mongodb://localhost/Brookdale_Crowd");
server.set("view engine", "ejs");
server.set("views", "./views");
server.use(logger("dev"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static("./public"));

//Routes
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

server.get("/", (req, res) => {
  CSR.find((err, foundRequests) => {
    res.render("index", { requests: foundRequests });
  }).catch(err => console.log("there was an error"));
});

server.get("/viewDetails/:id", (req, res) => {
  const CSRId = req.params.id;

  CSR.findById({ _id: CSRId }, (err, foundRequest) => {
    res.render("details", {
      brookdaleCrowdItem: foundRequest,
      currentTotalFundingAmt: totalAllFundingContributions(
        foundRequest.CONTRIBUTIONS
      )
    });
  }).catch(err => console.log("ERROR::", err));
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
      res.redirect("/");
    }
  );
});

server.post("/closeCSR/success/:id", (req, res) => {

  CSR.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { CSR_STATUS: "funded", CSR_STATUS_MESSAGE: req.body.CSR_STATUS_MESSAGE } },
    { new: true },
    (err, updatedRequest) => {
      res.redirect("/");
    }
  );
});

server.post("/closeCSR/failed/:id", (req, res) => {
  CSR.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { CSR_STATUS: "failed", CSR_STATUS_MESSAGE: req.body.CSR_STATUS_MESSAGE } },
    { new: true },
    (err, updatedRequest) => {
      res.redirect("/");
    }
  );
});

//Helper functions
function totalAllFundingContributions(contributions) {
  let contributionsArr = [];
  let total;
  contributions.forEach(e => {
    let fundAmt = parseInt(e.FUNDING_AMT);
    if (!isNaN(parseInt(fundAmt))) {
      contributionsArr.push(parseInt(fundAmt));
    }
    total = contributionsArr.reduce((a, b) => a + b);
  });

  return total;
}
