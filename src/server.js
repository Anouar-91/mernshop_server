import express  from 'express';
import dotenv from "dotenv";
import connectDb from './config/database';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import {notFound, errorHandler} from './middleware/errorMiddleware'

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

//middleware not found
app.use(notFound)

//middleware errors
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port `+ PORT ))

