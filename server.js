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
  }).catch(err => console.log("ERROR WITH GET'/': ", err));
});

server.get("/viewDetails/:id", (req, res) => {
  CSR.findById({ _id: req.params.id }, (err, foundRequest) => {
    // let formattedDate = getFormattedDate(foundRequest.CSR_FUNDING_DEADLINE);
    res.render("details", {
      brookdaleCrowdItem: foundRequest,
      currentTotalFundingAmt: totalAllFundingContributions(foundRequest.CONTRIBUTIONS),
      formattedDate: getFormattedDate(foundRequest.CSR_FUNDING_DEADLINE)
    });
  }).catch(err => console.log("ERROR WITH GET'/VIEWDETAILS/ID': ", err));
});

server.get("/faq", (req, res) => {
  res.render("faq");
});

server.post("/create_new", (req, res) => {
  const newCSR = new CSR(req.body);
  //see the createNew form for notes on on this branch(formChange)
  newCSR.save().then(data => {
    res.redirect("/");
  });
});

server.post("/fund_request/:id", (req, res) => {
  CSR.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { CONTRIBUTIONS: req.body } },
    { new: true },
    (err, updatedRequest) => {
      res.redirect("/");
    }
  );
});

server.post("/closeCSR/success/:id", (req, res) => {
  CSR.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        CSR_STATUS: "funded",
        CSR_STATUS_MESSAGE: req.body.CSR_STATUS_MESSAGE
      }
    },
    { new: true },
    (err, updatedRequest) => {
      res.redirect("/");
    }
  );
});

server.post("/closeCSR/failed/:id", (req, res) => {
  CSR.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        CSR_STATUS: "failed",
        CSR_STATUS_MESSAGE: req.body.CSR_STATUS_MESSAGE
      }
    },
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

function getFormattedDate(date) {
  let month;
  let day;
  let year;

  if ((date.getMonth() + 1) < 10) {
    month = "0" + (date.getMonth() + 1);
  }else month = (date.getMonth() + 1);

  if (date.getDate() < 10) {
    day = "0" + date.getDate();
  }else day = date.getDate();

  return month + "/" + day + "/" + date.getFullYear();
}
