const eventNames = require("./eventNames");
const Order = require("../order");

const reduce = async orderEvent => {
  console.log(`Trying to apply ${orderEvent.type}`);
  console.log("--------------------------");

  if (orderEvent.type === eventNames.CreateOrder) {
    const order = new Order({ orderId: orderEvent.orderId });
    await orderEvent.save();
    const savedOrder = await order.save();
    console.log(`Applied ${orderEvent.type} successfully`);
    console.log("--------------------------");
    return savedOrder;
  } else {
    const order = await Order.findOne({ orderId: orderEvent.orderId });

    switch (orderEvent.type) {
      case eventNames.UpdateEmail:
        order.email = orderEvent.data.email;
        break;

      case eventNames.UpdateFirstName:
        order.firstName = orderEvent.data.firstName;
        break;

      case eventNames.UpdateLastName:
        order.lastName = orderEvent.data.lastName;
        break;

      case eventNames.UpdateIsConfirmed:
        order.isConfirmed = orderEvent.data.isConfirmed;
        break;

      default:
        console.log(`No event name match found for ${orderEvent.type}`);
        console.log("--------------------------");
        break;
    }

    await orderEvent.save();
    const savedOrder = await order.save();

    console.log(`Applied ${orderEvent.type} successfully`);
    console.log("--------------------------");
    return savedOrder;
  }
};

module.exports = async events => {
  let order;

  // why not a map or forEach???
  // because we want each event to be synchronously applied
  for (const e of events) {
    order = await reduce(e);
  }

  return order;
};
