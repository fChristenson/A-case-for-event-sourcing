const OrderEvent = require("./OrderEvent");
const LoginEvent = require("./LoginEvent");
const saveEvents = require("./reducer");
const eventNames = require("./eventNames");

const makeLoginEvent = type => () => {
  return new LoginEvent({
    type
  });
};

const makeOrderEvent = type => (data = {}) => {
  const { orderId, isConfirmed } = data;
  const tmp = Object.assign({}, data);

  delete tmp.orderId;

  return new OrderEvent({
    type,
    orderId,
    data: tmp
  });
};

const AttemptedLogin = makeLoginEvent(eventNames.AttemptedLogin);
const SuccessfulLogin = makeLoginEvent(eventNames.SuccessfulLogin);
const CreateOrder = makeOrderEvent(eventNames.CreateOrder);
const UpdateCustomerId = makeOrderEvent(eventNames.UpdateCustomerId);
const UpdateFirstName = makeOrderEvent(eventNames.UpdateFirstName);
const UpdateLastName = makeOrderEvent(eventNames.UpdateLastName);
const UpdateEmail = makeOrderEvent(eventNames.UpdateEmail);
const UpdateIsConfirmed = makeOrderEvent(eventNames.UpdateIsConfirmed);
const ConfirmedOrder = makeOrderEvent(eventNames.UpdateIsConfirmed);

module.exports = {
  AttemptedLogin,
  SuccessfulLogin,
  ConfirmedOrder,
  CreateOrder,
  UpdateCustomerId,
  UpdateEmail,
  UpdateFirstName,
  UpdateLastName,
  UpdateIsConfirmed,
  OrderEvent,
  LoginEvent,
  eventNames,
  saveEvents
};
