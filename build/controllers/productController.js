"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getTopProducts = exports.getProducts = exports.getProductById = exports.deleteProduct = exports.createProductReview = exports.createProduct = void 0;
var _productModel = _interopRequireDefault(require("../models/productModel"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = (0, _expressAsyncHandler.default)(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};
  const count = await _productModel.default.countDocuments({
    ...keyword
  });
  const products = await _productModel.default.find({
    ...keyword
  }).limit(pageSize).skip(pageSize * (page - 1));
  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize)
  });
});

// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = getProducts;
const getProductById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product  not found');
  }
});
// @desc delete product
// @route DELETE /api/products/:id
// @access Private/Admin
exports.getProductById = getProductById;
const deleteProduct = (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "product removed"
    });
  } else {
    res.status(404);
    throw new Error('Product  not found');
  }
});

// @desc create product
// @route POST /api/products
// @access Private/Admin
exports.deleteProduct = deleteProduct;
const createProduct = (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = new _productModel.default({
    name: 'Smaple name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Smaple brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: "Sample description"
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update product
// @route PUT /api/products/:id
// @access Private/Admin
exports.createProduct = createProduct;
const updateProduct = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body.product;
  const product = await _productModel.default.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(404);
    throw new Error('Product  not found');
  }
  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

// @desc create new review
// @route POST /api/products/:id/review
// @access Private
exports.updateProduct = updateProduct;
const createProductReview = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    rating,
    comment
  } = req.body;
  const product = await _productModel.default.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({
      message: "Review added"
    });
  } else {
    res.status(404);
    throw new Error('Product  not found');
  }
});

// @desc get top rted products
// @route POST /api/products/top
// @access Public
exports.createProductReview = createProductReview;
const getTopProducts = (0, _expressAsyncHandler.default)(async (req, res) => {
  const products = await _productModel.default.find({}).sort({
    rating: -1
  }).limit(3);
  res.json(products);
});
exports.getTopProducts = getTopProducts;