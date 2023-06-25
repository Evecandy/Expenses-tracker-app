import sql from "mssql";
import config from "../database/config.js";

//get all categories

export const getCategories = async (req, res) => {
    try {
      let pool = await sql.connect(config.sql);
      const resultSet = await pool.request().query("SELECT * FROM Categories");
      res.status(200).json(resultSet.recordset);
    } catch (error) {
      res.status(220).json(error.message);
    } finally {
      sql.close();
    }
  };
