"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const users = [{
  name: 'Admin User',
  email: 'admin@gmail.com',
  password: _bcryptjs.default.hashSync('password', 10),
  isAdmin: true
}, {
  name: 'John Doe',
  email: 'john@gmail.com',
  password: _bcryptjs.default.hashSync('password', 10)
}, {
  name: 'Jane Doe',
  email: 'jane@gmail.com',
  password: _bcryptjs.default.hashSync('password', 10)
}];
var _default = users;
exports.default = _default;