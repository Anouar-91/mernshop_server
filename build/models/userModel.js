"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await _bcryptjs.default.compare(enteredPassword, this.password);
};
//this function called each time the user persist
userSchema.pre('save', async function (next) {
  //allow to above that this function called if we want to change name or email
  // in this situation not need to change password
  if (!this.isModified("password")) {
    next();
  }
  const salt = await _bcryptjs.default.genSalt(10);
  this.password = await _bcryptjs.default.hash(this.password, salt);
});
const User = _mongoose.default.model('User', userSchema);
var _default = User;
exports.default = _default;