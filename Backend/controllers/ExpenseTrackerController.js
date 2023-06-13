import sql from "mssql";
import config from "../database/config.js";

//lets get users
export const getUsers = async (req, res) => {
  try {
        let pool = await sql.connect(config.sql);
        const resultSet = await pool.request().query("SELECT * FROM Users");
        res.send(resultSet);
  } catch (error){
        res.status(220).json({error:'an error occurred while retrieving users'});
  } finally {
    sql.close();
  }
};

//create a user/ add a user
export const createUsers = async (req, res) => {
  res.send("create new user");
};

//get a user
export const getOneUser = async (req, res) => {
  res.send("get a user");
};

//update a user
export const updateUser = async (req, res) => {
  res.send("update a user");
};

//delete a user
export const deleteUser = async (req, res) => {
  res.send("delete a user");
};
