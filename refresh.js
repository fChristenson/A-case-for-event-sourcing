const mongoose = require("mongoose");
const E = require("./src/lib/events");
const Order = require("./src/lib/order");
mongoose.connect("mongodb://localhost:27017/test");

// this script lets us recreate our database
// from the events
const refresh = async () => {
  await Order.deleteMany({});
  const orderEvents = await E.OrderEvent.find({});
  await E.saveEvents(orderEvents);
  return mongoose.disconnect();
};

refresh();
