import sql from "mssql";
import config from "../database/config.js";

//lets get users
export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const resultSet = await pool.request().query("SELECT * FROM Users");
    res.status(200).json(resultSet.recordsets);
  } catch (error) {
    res.status(220).json({ error: "an error occurred while retrieving users" });
  } finally {
    sql.close();
  }
};

//create a user/ add a user
export const createUsers = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      // .input("UserID", sql.Int, UserID)
      .input("Username", sql.VarChar, Username)
      .input("Password", sql.VarChar, Password)
      .query(
        "INSERT INTO Users ( Username, Password) VALUES ( @Username, @Password)"
      );
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  } finally {
    sql.close();
  }
  // res.send("create new user");
};

//get a user
export const getOneUser = async (req, res) => {
  try {
    const { Username } = req.params;
    let pool = await sql.connect(config.sql);
    const resultSet = await pool
      .request()
      // .input('UserId', sql.Int, UserId)
      .input("Username", sql.VarChar, Username)
      .query("SELECT * FROM Users WHERE Username = @Username");
    res.status(200).json(resultSet.recordset[0]);
  } catch (error) {
  } finally {
    sql.close();
  }
};

//update a user
export const updateUser = async (req, res) => {
  // try{

  // }
  res.send("update a user");
};

//delete a user
export const deleteUser = async (req, res) => {
  res.send("delete a user");
};
