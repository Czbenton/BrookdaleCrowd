const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrowdSourceRequest = new Schema(
  {
    // model
    name: String,
    age: Number,
    username: String,
    summary: String,
    bizVal: String,
    forward: String,
    contributions: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      enum: ["pending", "funded", "failed"],
      default: "pending"
    }
  },
  {
    // options
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = mongoose.model("CrowdSourceRequest", CrowdSourceRequest);
