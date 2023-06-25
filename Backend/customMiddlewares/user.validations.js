import createUserSchema from "../schemas/createUser.schema.js";

export const validateCreateUserData = (req,res,next)=>{
    try{
        const {error} = createUserSchema.validate(req.body)
        
        if (error) {
            return res.status(400).json({message:error.details[0].message})  
        } else {
            next();
        }
        
    } catch(error) {
        return res.status(500).json({message:error.message})
        
    }

}
