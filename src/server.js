import express  from 'express';
import dotenv from "dotenv";
import connectDb from './config/database';
import productRoutes from './routes/productRoutes';

const app = express();
dotenv.config();
connectDb();


let cors = require("cors");
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port `+ PORT ))

