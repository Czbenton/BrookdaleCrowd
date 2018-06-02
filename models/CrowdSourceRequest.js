const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrowdSourceRequest = new Schema(
  {
    // model
    FIRST_NAME: {
      type: String,
    },
    LAST_NAME: {
      type: String,
    },
    USERNAME:{
      type: String,
    },
    CSR_SUMMARY: {
      type: String,
    },
    CSR_BUSINESS_VALUE: {
      type: String,
    },
    CSR_PAY_FORWARD_DESC: {
      type: String,
    },
    CSR_FUNDING_AMT_REQ: {
      type: Number,
    },
    CSR_FUNDING_DEADLINE: {
      type: Date,
    },
    CONTRIBUTIONS: {
      type: Array,
      default: []
    },
    CSR_STATUS: {
      type: String,
      enum: ["pending", "funded", "failed"],
      default: "pending"
    },
    CSR_STATUS_MESSAGE: {
      type: String,
    }
  },
  {
    // options
    strict: false,
    timestamps: { createdAt: "CREATED_AT", updatedAt: "UPDATED_AT"}
  }
);

module.exports = mongoose.model("CrowdSourceRequest", CrowdSourceRequest);