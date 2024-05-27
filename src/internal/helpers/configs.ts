/**
 * helper functions for getting config values.
 */

import { PoolOptions } from "mysql2/promise";

export const getServerPort = (): string => {
  return process.env.SERVER_PORT || "8000";
};

export const getMySqlPoolOptions = (): PoolOptions => ({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(process.env.POOL_LIMIT), // Maximum number of connections in the pool
  queueLimit: 0,
});

export const getJWTSecret = (): string => {
  return process.env.JWT_SECRET || "jwt_secret";
};
