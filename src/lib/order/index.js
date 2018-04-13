const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  orderId: { type: String, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  isConfirmed: { type: Boolean, default: false },
  email: { type: String, default: "" }
});

module.exports = mongoose.model("Order", Order);
