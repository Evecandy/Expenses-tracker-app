
import sql from "mssql";
import config from "../database/config.js";

//get all expenses

export const getExpenses = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const resultSet = await pool.request().query("SELECT * FROM Expenses");
    res.status(200).json(resultSet.recordsets);
  } catch (error) {
    res.status(220).json(error.message);
  } finally {
    sql.close();
  }
};
//create/add an expense
export const addExpense = async (req, res) => {
    try {
      const { Username, Date, Amount,CategoryName } = req.body;
      let pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("Username", sql.VarChar, Username)
        .input("Date", sql.Date, Date)
        .input("Amount", sql.Decimal, Amount)
        .input("CategoryName", sql.VarChar, CategoryName)
        .query(
          "INSERT INTO Expenses ( Username, Date, Amount, CategoryName ) VALUES ( @Username, @Date, @Amount, @CategoryName)"
        );
      res.status(200).json({ message: "expense added successfully" });
    } catch (error) {
      res
        .status(500)
        .json( error.message);
    } finally {
      sql.close();
    }
    
  };


  //delete an expense
  export const deleteExpense = async (req, res) => {
    try {
      const { Date } = req.params;
      let pool = await sql.connect(config.sql);
  
      await sql.query`DELETE FROM Expenses WHERE Date = ${Date}`;
      res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json( error.message);
    } finally {
      sql.close();
    }
  };

  //update an expense

  export const updateExpense = async (req, res) => {
    try{
        const { Username } = req.params;
        const {EmailAddress} = req.body;
        const {Password} = req.body;
        let pool = await sql.connect(config.sql);
        const resultset = await pool
          .request()
          .input("Username", sql.VarChar, Username)
          .input("EmailAddress", sql.VarChar, EmailAddress)
          .input("Password", sql.VarChar, Password)
          .query(
            "UPDATE Users SET Password=@Password WHERE Username=@Username"
          );
          res.status(200).json({message:"User password was updated successfully"});
    } catch (error) {
      
        res.status(400).json(error.message)
        
    }  finally {
      sql.close();
    }
   
  };

