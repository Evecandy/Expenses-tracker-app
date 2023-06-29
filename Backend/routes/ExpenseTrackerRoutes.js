// import { Router } from "express";
import {getUsers, createUsers, getOneUser, updateUser, deleteUser} from "../controllers/user.controller.js";
import { validateCreateUserData } from "../customMiddlewares/user.validations.js";
import { signup, signin} from "../controllers/user.controller.js";
import {addExpense, deleteExpense, updateExpense,getExpenses} from '../controllers/expenses.controller.js';
import { verifyUser } from "../customMiddlewares/auth.js";
import { getCategories } from "../controllers/categories.controller.js";

const ExpenseTrackerRoutes = (app) => {
  app.route('/users').get(getUsers).post(validateCreateUserData, createUsers);
  app
    .route('/users/:Username')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);
    


  app
    .route('/expenses')
    .post(verifyUser,addExpense)
    .get( verifyUser, getExpenses);
  app
    .route ('/expenses/:ExpenseID')
    .delete(verifyUser,deleteExpense)
    .put(verifyUser, updateExpense);

  //auth routes
  app.route('/auth/signup').post(signup);

  app.route('/auth/signin').post(signin);

  app
    .route('/categories')
    .get(verifyUser, getCategories);
};


// const ExpenseTrackerRoutes = Router()
// ExpenseTrackerRoutes.get('',accountRequired, getUsers)
// ExpenseTrackerRoutes.get('/:Username', getOneUser)

export default ExpenseTrackerRoutes;
