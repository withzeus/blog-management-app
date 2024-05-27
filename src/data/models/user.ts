import db from "../mysql/db";
import RawSQLQuerys from "../mysql/scripts";
import { Pool } from "mysql2";

export interface UsersTable {
  username: string;
  password: string;
  email: string;
}

class UserModel {
  private db: Pool;

  constructor() {
    this.db = db;
  }

  async createUser(sqlPayload: string[]) {
    let affected: number = await new Promise((resolve, reject) => {
      this.db.query(
        RawSQLQuerys.CREATE_USER,
        [sqlPayload],
        async (err, result: any) => {
          if (err) reject(err);
          resolve(result.affectedRows);
        }
      );
    });

    if (affected) {
      return affected;
    }
  }

  async findUser(sqlPayload: string) {
    let user: {
      id?: string;
      password?: string;
    } = await new Promise((resolve, reject) => {
      this.db.query(
        RawSQLQuerys.SEARCH_USERS + sqlPayload,
        async (err, result: any[]) => {
          if (err) reject(err);
          resolve(result[0]);
        }
      );
    });
    return user;
  }
}

export default new UserModel();
