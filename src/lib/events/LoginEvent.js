const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginEvent = new Schema({
  type: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LoginEvent", LoginEvent);
