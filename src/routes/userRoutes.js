import express from "express";
const router = express.Router();
import {authUser, getUserProfile, registerUser} from '../controllers/userController';
import {protect} from '../middleware/authMiddleware';


router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/register').post( registerUser)

export default router;
