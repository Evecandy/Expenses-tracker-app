import joi from "joi";


const createExpenseSchema = joi.object({
    Username: joi.string().min(2).max(50).required(),
    Date: joi.date().max('now').required(),
    Amount: joi.number().precision(10).max(9999999.99).required(),
    CategoryName: joi.string().min(6).required()
    
})


export default createExpenseSchema;