// import { Router } from "express";
import {
  getUsers,
  createUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from "../controllers/ExpenseTrackerController.js";
import { validateCreateUserData } from "../customMiddlewares/user.validations.js";
import {
  signinRequired,
  signup,
  signin,
} from "../controllers/ExpenseTrackerController.js";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../controllers/Expenses.controller.js';

const ExpenseTrackerRoutes = (app) => {
  app.route('/users').get(getUsers).post(validateCreateUserData, createUsers);
  app
    .route('/users/:Username')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);
    


  app
    .route('/expenses')
    .post(signin, addExpense);
  app
    .route ('/expenses/:CategoryName')
    .delete(signinRequired, deleteExpense)
    .put(signinRequired, updateExpense);

  //auth routes
  app.route('/auth/signup').post(signup);

  app.route('/auth/signin').post(signin);
};

// const ExpenseTrackerRoutes = Router()
// ExpenseTrackerRoutes.get('',accountRequired, getUsers)
// ExpenseTrackerRoutes.get('/:Username', getOneUser)

export default ExpenseTrackerRoutes;
