import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from '../data/users';
import products from '../data/products'
import User from '../models/userModel';
import Product from '../models/productModel';
import Order from '../models/orderModel';
import connectDb from '../config/database';


dotenv.config();

connectDb();


const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destoyed')

    } catch (error) {
        console.error(`${error}`)
        process.exit(1);
        
    }
}

destroyData();
