import express from "express";
import products from '../data/products';
import Product from '../models/productModel'
import asyncHandler from "express-async-handler"


const router = express.Router();

router.get('/', asyncHandler(async (req, res, next)  => {
        const products = await Product.find({})
        res.json(products);
        
}))


router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
    }else{
        res.status(404)
        throw new Error('Product  not found')
    }
}))


export default router;
