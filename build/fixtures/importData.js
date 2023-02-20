"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _users = _interopRequireDefault(require("../data/users"));
var _products = _interopRequireDefault(require("../data/products"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _productModel = _interopRequireDefault(require("../models/productModel"));
var _orderModel = _interopRequireDefault(require("../models/orderModel"));
var _database = _interopRequireDefault(require("../config/database"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
(0, _database.default)();
const importData = async () => {
  try {
    await _orderModel.default.deleteMany();
    await _productModel.default.deleteMany();
    await _userModel.default.deleteMany();
    const createdUser = await _userModel.default.insertMany(_users.default);
    const adminUser = createdUser[0]._id;
    const sampleProducts = await _products.default.map(product => {
      return {
        ...product,
        user: adminUser
      };
    });
    await _productModel.default.insertMany(sampleProducts);
    console.log('Data imported');
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
importData();