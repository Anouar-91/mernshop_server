import express  from 'express';
import dotenv from "dotenv";
import connectDb from './config/database';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import {notFound, errorHandler} from './middleware/errorMiddleware';
import orderRoutes from './routes/orderRoutes';
import uploadRoutes from './routes/uploadRoutes';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';

dotenv.config();
connectDb();
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"))
}
//allow to accept json in body
app.use(express.json())

let cors = require("cors");
app.use(cors({
    origin: [ "https://brilliant-licorice-c691cc.netlify.app","https://mernshop.herokuapp.com",process.env.CLIENT_URL, "http://localhost:3000", "*"],
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

const imageDirectory = path.join(`${__dirname}/../`, 'uploads');

app.get('/uploads/:imageName', (req, res) => {
    // Récupération du nom de l'image à partir de la requête
    const imageName = req.params.imageName;
    // construire le chemin complet de l'image
    const imagePath = path.join(imageDirectory, imageName);
    // Vérifiez si l'image existe dans le répertoire
    if (fs.existsSync(imagePath)) {
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
app.use(notFound)

//middleware errors
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port `+ PORT ))

