"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.admin = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//allow to protect route and set req.user with user detail
const protect = (0, _expressAsyncHandler.default)(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      //retrieve user without password
      req.user = await _userModel.default.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
exports.protect = protect;
const admin = (0, _expressAsyncHandler.default)(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error('Not authorized as an admin');
  }
});
exports.admin = admin;