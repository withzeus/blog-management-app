import * as dotenv from "dotenv";
import { v4 } from "uuid";

dotenv.config();

export * from "./configs";
export * from "./logger";
export * from "./bcrypt";

export const createUUID = () => {
  return v4();
};

export const mapObjectToSqlString = <T extends object>(payload: T): string => {
  return Object.entries(payload)
    .map(([k, v]) => `${k}="${v}"`)
    .join(", ");
};

export const sucessGetResponse = <T>(data: T) => {
  return {
    status: "OK",
    data,
  };
};

export const getValidationErrorResponse = (message: string) => {
  return {
    status: "BAD_REQUEST",
    message,
  };
};

export const getForbiddenErrorResponse = (message: string) => {
  return {
    status: "FORBIDDEN",
    message,
  };
};
