import db from "../mysql/db";
import RawSQLQuerys from "../mysql/scripts";
import { Pool } from "mysql2";

export interface PostsTable {
  user_id: string;
  title: string;
  content: string;
}

class PostModel {
  private db: Pool;

  constructor() {
    this.db = db;
  }

  async createPost(sqlPayload: string[]) {
    let affected: number = await new Promise((resolve, reject) => {
      this.db.query(
        RawSQLQuerys.CREATE_POST,
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

  async findPost(sqlPayload: string) {
    let post: {
      id?: string;
      user_id?: string;
    } = await new Promise((resolve, reject) => {
      this.db.query(
        RawSQLQuerys.SEARCH_POSTS + sqlPayload,
        async (err, result: any[]) => {
          if (err) reject(err);
          resolve(result[0]);
        }
      );
    });
    return post;
  }

  async findPosts() {
    let posts: {
      id: string;
      user_id: string;
      title: string;
      content: string;
    }[] = await new Promise((resolve, reject) => {
      this.db.query(RawSQLQuerys.GET_POSTS, async (err, result: any[]) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    return posts;
  }

  async updatePost(payload: string, id: string, user_id: string) {
    const sqlPayload = [id, user_id];

    let affected: number = await new Promise((resolve, reject) => {
      this.db.query(
        RawSQLQuerys.UPDATE_POST.replace("{fields}", payload),
        sqlPayload,
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

  async deletePost(sqlPayload: any[]) {
    let affected: number = await new Promise((resolve, reject) => {
      this.db.query(
        RawSQLQuerys.DELETE_POST,
        sqlPayload,
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
}

export default new PostModel();
