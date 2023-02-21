"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _database = _interopRequireDefault(require("./config/database"));
var _productRoutes = _interopRequireDefault(require("./routes/productRoutes"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));
var _errorMiddleware = require("./middleware/errorMiddleware");
var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));
var _uploadRoutes = _interopRequireDefault(require("./routes/uploadRoutes"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _morgan = _interopRequireDefault(require("morgan"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
(0, _database.default)();
const app = (0, _express.default)();
if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan.default)("dev"));
}
//allow to accept json in body
app.use(_express.default.json());
let cors = require("cors");
app.use(cors({
  origin: ["https://brilliant-licorice-c691cc.netlify.app", "https://mernshop.herokuapp.com", process.env.CLIENT_URL, "http://localhost:3000", "*"],
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/users', _userRoutes.default);
app.use('/api/products', _productRoutes.default);
app.use('/api/orders', _orderRoutes.default);
app.use('/api/upload', _uploadRoutes.default);
app.use('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
const imageDirectory = _path.default.join(`${__dirname}/../`, 'uploads');
app.get('/uploads/:imageName', (req, res) => {
  // Récupération du nom de l'image à partir de la requête
  const imageName = req.params.imageName;
  // construire le chemin complet de l'image
  const imagePath = _path.default.join(imageDirectory, imageName);
  // Vérifiez si l'image existe dans le répertoire
  if (_fs.default.existsSync(imagePath)) {
    // Envoi de l'image en réponse
    res.sendFile(imagePath);
  } else {
    // Envoi d'une réponse d'erreur
    res.status(404).send('Image not found');
  }
});
/* const __dirname = path.resolve()
app.use('uploads', express.static(path.join(__dirname, '/uploads'))) */

//middleware not found
app.use(_errorMiddleware.notFound);

//middleware errors
app.use(_errorMiddleware.errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ` + PORT));