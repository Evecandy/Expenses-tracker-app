// import { Router } from "express";
import { getUsers, createUsers, getOneUser, updateUser, deleteUser } from "../controllers/ExpenseTrackerController.js";
import { validateCreateUserData } from "../customMiddlewares/user.validations.js";



const ExpenseTrackerRoutes = (app) => {
  app.route("/users").get(getUsers).post(validateCreateUserData, createUsers);
  app.route("/users/:Username").get(getOneUser).put(updateUser).delete(deleteUser);
};

// const ExpenseTrackerRoutes = Router()
// ExpenseTrackerRoutes.get('',accountRequired, getUsers)
// ExpenseTrackerRoutes.get('/:Username', getOneUser)


export default ExpenseTrackerRoutes;
