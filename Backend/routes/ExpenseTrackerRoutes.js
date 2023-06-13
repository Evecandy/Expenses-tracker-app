import { getUsers } from "../controllers/ExpenseTrackerController.js";
import { createUsers } from "../controllers/ExpenseTrackerController.js";
import { getOneUser } from "../controllers/ExpenseTrackerController.js";
import { updateUser } from "../controllers/ExpenseTrackerController.js";
import { deleteUser } from "../controllers/ExpenseTrackerController.js";

const ExpenseTrackerRoutes = (app) => {
  app.route("/users").get(getUsers).post(createUsers);
  app.route("/users/:id").get(getOneUser).put(updateUser).delete(deleteUser);
};

export default ExpenseTrackerRoutes;
