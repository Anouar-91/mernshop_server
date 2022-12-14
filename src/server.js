import express  from 'express';
import dotenv from "dotenv";
import connectDb from './config/database';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import {notFound, errorHandler} from './middleware/errorMiddleware';
import orderRoutes from './routes/orderRoutes';

dotenv.config();
connectDb();
const app = express();
//allow to accept json in body
app.use(express.json())

let cors = require("cors");
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

//middleware not found
app.use(notFound)

//middleware errors
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port `+ PORT ))

