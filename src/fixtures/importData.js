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

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id;
        const sampleProducts = await products.map((product) => {
            return{
                ...product, user: adminUser
            }
        });
        await Product.insertMany(sampleProducts);
        console.log('Data imported')

    } catch (error) {
        console.error(`${error}`)
        process.exit(1);
        
    }
}



importData();
