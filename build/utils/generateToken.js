"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateToken = id => {
  return _jsonwebtoken.default.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
var _default = generateToken;
exports.default = _default;