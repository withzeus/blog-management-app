import db from "./db";
import RawSQLQuerys from "./scripts";
import { getLogger } from "../../internal/helpers";
import { exit } from "process";

const logger = getLogger();

async function seed() {
  db.query(`${RawSQLQuerys.CREATE_USERS_TABLE}`, (error) => {
    if (error) {
      console.log(error);
      logger.error("FAILED TO CREATE USERS TABLE");
    }
  });
  db.query(`${RawSQLQuerys.CREATE_POSTS_TABLE}`, (error) => {
    if (error) {
      console.log(error);
      logger.error("FAILED TO CREATE POSTS TABLE");
    }
  });

  exit();
}

seed();
