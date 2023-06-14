// import { Router } from "express";
import { getUsers, createUsers, getOneUser, updateUser, deleteUser } from "../controllers/ExpenseTrackerController.js";


const ExpenseTrackerRoutes = (app) => {
  app.route("/users").get(getUsers).post(createUsers);
  app.route("/users/:Username").get(getOneUser).put(updateUser).delete(deleteUser);
};

// const ExpenseTrackerRoutes = Router()
// ExpenseTrackerRoutes.get('', getUsers)
// ExpenseTrackerRoutes.get('/:Username', getOneUser)


export default ExpenseTrackerRoutes;
