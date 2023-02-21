"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
function slugify(str) {
  console.log("slugify function");
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
const storage = _multer.default.diskStorage({
  destination(req, res, cb) {
    console.log(`${__dirname}/../../uploads/`, "TEST");
    cb(null, `${__dirname}/../../uploads/`);
  },
  filename(req, file, cb) {
    cb(null, `${slugify(file.originalname)}-${Date.now()}${_path.default.extname(file.originalname)}`);
  }
});
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(_path.default.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only !");
  }
}
const upload = (0, _multer.default)({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});
router.post('/', upload.single("image"), (req, res) => {
  console.log("je suis dans lupload image");
  res.send(`${req.file.path}`);
});
var _default = router;
exports.default = _default;