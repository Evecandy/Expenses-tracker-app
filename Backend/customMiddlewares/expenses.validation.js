import createExpenseSchema from "../schemas/create.expense.schema.js";

export const validateExpensesData = (req,res,next)=>{
    try{
        const {error} = createExpenseSchema.validate(req.body)
        
        if (error) {
            return res.status(400).json({message:error.details[0].message})  
        } else {
            next();
        }
        
    } catch(error) {
        return res.status(500).json({message:error.message})
        
    }

}