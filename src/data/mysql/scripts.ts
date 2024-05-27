const RawSQLQuerys = {
  CREATE_USERS_TABLE:
    "CREATE TABLE IF NOT EXISTS users ( id CHAR(36) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255));",
  CREATE_POSTS_TABLE:
    "CREATE TABLE IF NOT EXISTS posts ( id CHAR(36) PRIMARY KEY, user_id CHAR(36), title VARCHAR(255), content TEXT, FOREIGN KEY (user_id) REFERENCES users(id));",
  CREATE_USER: "INSERT INTO users (id, username, password, email) VALUES (?)",
  UPDATE_USER: "UPDATE users SET ? WHERE id = ?",
  GET_USER: "SELECT * FROM users WHERE id = ?",
  DELETE_USER: "DELETE FROM users WHERE id = ?",
  GET_USERS: "SELECT * FROM users",
  SEARCH_USERS: "SELECT * FROM users WHERE ",
  CREATE_POST: "INSERT INTO posts (id, user_id, title, content) VALUES (?)",
  UPDATE_POST: "UPDATE posts SET {fields} WHERE id = ? AND user_id = ?",
  GET_POST: "SELECT * FROM posts WHERE id = ?",
  DELETE_POST: "DELETE FROM posts WHERE id = ?",
  GET_POSTS: "SELECT * FROM posts",
  SEARCH_POSTS: "SELECT * FROM posts WHERE ",
};

export default RawSQLQuerys;
