"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderToPaid = exports.updateOrderToDeliverd = exports.getOrders = exports.getOrderById = exports.getMyOrders = exports.addOrderItems = void 0;
var _orderModel = _interopRequireDefault(require("../models/orderModel"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @desc Create new order
// @route GET /api/orders
// @access Private
const addOrderItems = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items found');
  } else {
    const order = new _orderModel.default({
      orderItems,
      user: req.user._id ? req.user._id : null,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      shippingAddress,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
exports.addOrderItems = addOrderItems;
const getOrderById = (0, _expressAsyncHandler.default)(async (req, res) => {
  //function populate allow to retrieve name and email of user
  const order = await _orderModel.default.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
exports.getOrderById = getOrderById;
const updateOrderToPaid = (0, _expressAsyncHandler.default)(async (req, res) => {
  //function populate allow to retrieve name and email of user
  const order = await _orderModel.default.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get logged i, user orders
// @route GET /api/orders/myorders
// @access Private
exports.updateOrderToPaid = updateOrderToPaid;
const getMyOrders = (0, _expressAsyncHandler.default)(async (req, res) => {
  //function populate allow to retrieve name and email of user
  const orders = await _orderModel.default.find({
    user: req.user._id
  });
  res.json(orders);
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
exports.getMyOrders = getMyOrders;
const getOrders = (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderModel.default.find({});
  res.json(orders);
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliverer
// @access Private/Admin
exports.getOrders = getOrders;
const updateOrderToDeliverd = (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
exports.updateOrderToDeliverd = updateOrderToDeliverd;