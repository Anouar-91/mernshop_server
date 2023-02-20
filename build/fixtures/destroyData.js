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
const destroyData = async () => {
  try {
    await _orderModel.default.deleteMany();
    await _productModel.default.deleteMany();
    await _userModel.default.deleteMany();
    console.log('Data Destoyed');
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
destroyData();