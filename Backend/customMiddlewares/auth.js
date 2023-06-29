import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const verifyUser = (req,res,next)=> {
// console.log(req.headers);
    try {
        const token = req.headers['token']
        //console.log(token,'token');
        if (!token) {
            return res.status(403).json({message:'Forbidden'})
            // return res.status(401).json({message:'Unauthorized'})
        }
        req.auth = jwt.verify(token,process.env.JWT_SECRET)
        
        next()
    } catch (error) {
        res.json(error)
    }


}



