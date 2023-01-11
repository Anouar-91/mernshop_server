import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';

//allow to protect route and set req.user with user detail
const protect = expressAsyncHandler( async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //retrieve user without password
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

const admin = expressAsyncHandler( async (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        throw new Error('Not authorized as an admin')
    }
})

export {
    protect,admin
}