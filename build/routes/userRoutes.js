"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/login').post(_userController.authUser);
router.route('/').get(_authMiddleware.protect, _authMiddleware.admin, _userController.getUsers);
router.route('/profile').get(_authMiddleware.protect, _userController.getUserProfile);
router.route('/profile').put(_authMiddleware.protect, _userController.updateUserProfile);
router.route('/register').post(_userController.registerUser);
router.route('/:id').delete(_authMiddleware.protect, _authMiddleware.admin, _userController.deleteUser);
router.route('/:id').get(_authMiddleware.protect, _authMiddleware.admin, _userController.getUserById);
router.route('/:id').put(_authMiddleware.protect, _authMiddleware.admin, _userController.updateUser);
var _default = router;
exports.default = _default;