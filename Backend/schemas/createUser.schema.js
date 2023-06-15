import joi from "joi";


const createUserSchema = joi.object({
    Username: joi.string().min(2).max(50).required(),
    Password: joi.string().min(6).required()
})


export default createUserSchema;