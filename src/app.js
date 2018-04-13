const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const E = require("./lib/events");
const Order = require("./lib/order");
const uuid = require("node-uuid");

const makePath = filename => {
  return path.resolve(__dirname, "..", "public", filename);
};

const byDate = (a, b) => {
  if (a.timestamp > b.timestamp) return 1;
  if (a.timestamp < b.timestamp) return -1;

  return 0;
};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(makePath("index.html"));
});

app.post("/login", async (req, res) => {
  await E.AttemptedLogin({ username: req.body.username }).save();
  await E.SuccessfulLogin({ username: req.body.username }).save();
  res.redirect("/admin");
});

app.get("/admin", async (req, res) => {
  const orderEvents = await E.OrderEvent.find({});
  const loginEvents = await E.LoginEvent.find({});
  const events = orderEvents.concat(loginEvents).sort(byDate);
  const orders = (await Order.find({})) || [];
  res.render(makePath("admin"), { events, orders });
});

app.get("/confirm", async (req, res) => {
  const confirmEvent = E.ConfirmedOrder({
    orderId: req.query.id,
    isConfirmed: true
  });

  await E.saveEvents([confirmEvent]);

  res.redirect("/admin");
});

app.get("/order", (req, res) => {
  res.sendFile(makePath("order.html"));
});

app.post("/order", async (req, res) => {
  // We create a order first so we are sure that there is an orderId
  const createEvent = E.CreateOrder({ orderId: uuid.v4() });
  const order = await E.saveEvents([createEvent]);

  const firstNameEvent = E.UpdateFirstName({
    orderId: order.orderId,
    firstName: req.body.firstName
  });

  const lastNameEvent = E.UpdateLastName({
    orderId: order.orderId,
    lastName: req.body.lastName
  });

  const emailEvent = E.UpdateEmail({
    orderId: order.orderId,
    email: req.body.email
  });

  // we apply the other events to create the full order state
  const events = [firstNameEvent, lastNameEvent, emailEvent];
  await E.saveEvents(events);

  res.redirect("/admin");
});

module.exports = app;
