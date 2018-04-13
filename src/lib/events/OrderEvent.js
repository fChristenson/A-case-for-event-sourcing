const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderEvent = new Schema({
  orderId: { type: String, default: "" },
  type: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
  data: { type: Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model("OrderEvent", OrderEvent);
