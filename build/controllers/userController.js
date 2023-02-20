"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.updateUser = exports.registerUser = exports.getUsers = exports.getUserProfile = exports.getUserById = exports.deleteUser = exports.authUser = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _generateToken = _interopRequireDefault(require("../utils/generateToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @desc Auth user & get token
// @route GET /api/users/login
// @access Public
const authUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await _userModel.default.findOne({
    email: email
  });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: (0, _generateToken.default)(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
exports.authUser = authUser;
const getUserProfile = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
exports.getUserProfile = getUserProfile;
const updateUserProfile = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: (0, _generateToken.default)(updateUser._id)
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc register user
// @route GET /api/users/register
// @access Public
exports.updateUserProfile = updateUserProfile;
const registerUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const userExist = await _userModel.default.findOne({
    email
  });
  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }
  const user = await _userModel.default.create({
    name,
    email,
    password
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: (0, _generateToken.default)(user._id)
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
exports.registerUser = registerUser;
const getUsers = (0, _expressAsyncHandler.default)(async (req, res) => {
  const users = await _userModel.default.find({});
  res.json(users);
});
// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
exports.getUsers = getUsers;
const deleteUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: 'User removed'
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
exports.deleteUser = deleteUser;
const getUserById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user
// @route PUT /api/users/:id
// @access Private/Admin
exports.getUserById = getUserById;
const updateUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.isAdmin !== null) {
      user.isAdmin = req.body.isAdmin === true ? true : false;
    } else {
      user.isAdmin = user.isAdmin;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
exports.updateUser = updateUser;