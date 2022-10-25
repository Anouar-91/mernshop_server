import express  from 'express';
import products from'./data/products';
import dotenv from "dotenv";

const app = express();

dotenv.config();

let cors = require("cors");
app.use(cors());

app.get('/api/products', (req, res) => {
    res.json(products);
})
app.get('/api/product/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port `+ PORT ))

