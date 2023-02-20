"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _productController = require("../controllers/productController");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/').get(_productController.getProducts);
router.route('/top').get(_productController.getTopProducts);
router.route('/').post(_authMiddleware.protect, _authMiddleware.admin, _productController.createProduct);
router.route('/:id/reviews').post(_authMiddleware.protect, _productController.createProductReview);
router.route('/:id').get(_productController.getProductById);
router.route('/:id').delete(_authMiddleware.protect, _authMiddleware.admin, _productController.deleteProduct);
router.route('/:id').put(_authMiddleware.protect, _authMiddleware.admin, _productController.updateProduct);
var _default = router;
exports.default = _default;