//This is where I will store all my connections.
import dotenv from "dotenv";
import assert from "assert";


dotenv.config();

const { PORT, HOST, HOST_URL, SQL_SERVER, SQL_USER, SQL_DB, SQL_PASSWORD, JWT_SECRET } =
  process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

const config = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  sql: {
    server: SQL_SERVER,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DB,
    options: {
      encrypt: sqlEncrypt,
      enableArithAbort: true,
    },
  },
  jwt_secret: JWT_SECRET
};

export default config;
