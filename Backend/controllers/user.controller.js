import sql from "mssql";
import config from "../database/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signinRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

export const signup = async (req, res) => {
  const { Username, Password, EmailAddress } = req.body;
  const hashedPassword = bcrypt.hashSync(Password, 10);
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("Username", sql.VarChar, Username)
      .input("Password", sql.VarChar, Password)
      .input("EmailAddress", sql.VarChar, EmailAddress)
      .query(
        "SELECT * FROM Users WHERE Username = @Username OR EmailAddress = @EmailAddress"
      );
    const user = result.recordset[0];
    if (user) {
      res.status(409).json({ error: "User already exists" });
    } else {
      await pool
        .request()
        .input("Username", sql.VarChar, Username)
        .input("Password", sql.VarChar, hashedPassword)
        .input("EmailAddress", sql.VarChar, EmailAddress)
        .query(
          "INSERT INTO Users (Username, Password, EmailAddress) VALUES (@Username, @Password, @EmailAddress)"
        );
      res.status(200).send({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

export const signin = async (req, res) => {
  const { Username, Password } = req.body;
  let pool = await sql.connect(config.sql);
  const result = await pool
    .request()
    .input("Username", sql.VarChar, Username)
    .input("Password", sql.VarChar, Password)
    .query("SELECT * FROM Users WHERE Username = @Username");
  const user = result.recordset[0];
  if (!user) {
    res.status(401).json({ error: "Authentication failed. Wrong cedentials." });
  } else {
    if (!bcrypt.compareSync(Password, user.Password)) {
      res.status(401).json({error:'signin not successful'});
    } else {
      const token = `JWT ${jwt.sign(
        { username: user.Username },
        config.jwt_secret
      )}`;
      res
        .status(200)
        .json({
          Username: user.Username,
          token: token
        });
    }
  }
};

//lets get all users
export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const resultSet = await pool.request().query("SELECT * FROM Users");
    res.status(200).json(resultSet.recordsets);
  } catch (error) {
    res.status(220).json(error.message);
  } finally {
    sql.close();
  }
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
    console.log(resultSet.recordset);
    res.status(200).json(resultSet);
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

//create a user/ add a user
export const createUsers = async (req, res) => {
  try {
    const { Username, Password, EmailAddress } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      // .input("UserID", sql.Int, UserID)
      .input("Username", sql.VarChar, Username)
      .input("EmailAddress", sql.VarChar, EmailAddress)
      .input("Password", sql.VarChar, Password)
      .query(
        "INSERT INTO Users ( Username, EmailAddress, Password) VALUES ( @Username, @EmailAddress, @Password)"
      );
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

//update a user
export const updateUser = async (req, res) => {
  try {
    const { Username } = req.params;
    const { EmailAddress } = req.body;
    const { Password } = req.body;
    let pool = await sql.connect(config.sql);
    const resultset = await pool
      .request()
      .input("Username", sql.VarChar, Username)
      .input("EmailAddress", sql.VarChar, EmailAddress)
      .input("Password", sql.VarChar, Password)
      .query("UPDATE Users SET Password=@Password WHERE Username=@Username");
    res.status(200).json({ message: "User password was updated successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  } finally {
    sql.close();
  }
};

//delete a user
export const deleteUser = async (req, res) => {
  try {
    const { Username } = req.params;
    let pool = await sql.connect(config.sql);

    await sql.query`DELETE FROM users WHERE Username = ${Username}`;
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};
