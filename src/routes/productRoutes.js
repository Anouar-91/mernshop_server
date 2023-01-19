import express from "express";
const router = express.Router();
import {getProducts, getProductById, deleteProduct} from '../controllers/productController'
import {protect, admin} from '../middleware/authMiddleware';


router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
router.route('/:id').delete(protect, admin, deleteProduct)

export default router;
