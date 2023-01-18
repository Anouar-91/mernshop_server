import express from "express";
const router = express.Router();
import {authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile} from '../controllers/userController';
import {protect, admin} from '../middleware/authMiddleware';


router.route('/login').post(authUser)
router.route('/').get(protect,admin, getUsers)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)
router.route('/register').post( registerUser)
router.route('/:id').delete(protect, admin, deleteUser)
router.route('/:id').get(protect, admin, getUserById)
router.route('/:id').put(protect, admin, updateUser)

export default router;
