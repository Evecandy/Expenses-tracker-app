import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const verifyUser = (req,res,next)=> {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(401).json({message:'Unauthorized'})
        }
        req.auth = jwt.verify(token,process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(403).json({message:'Forbidden'})
    }
}