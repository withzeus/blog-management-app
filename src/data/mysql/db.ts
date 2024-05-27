import mysql, { Pool } from "mysql2";
import { getMySqlPoolOptions } from "../../internal/helpers";

const db: Pool = mysql.createPool(getMySqlPoolOptions());

export default db;
