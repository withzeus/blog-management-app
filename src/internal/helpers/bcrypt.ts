import jwt from "jsonwebtoken";
import { hashSync, genSaltSync, compare } from "bcryptjs";
import { getJWTSecret } from "./configs";

export const hashPassword = (
  password: string,
  saltRounds: number = 10
): string => {
  return hashSync(password, genSaltSync(saltRounds));
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

export const signJwt = (userId: string): string => {
  return jwt.sign(
    {
      user_id: userId,
    },
    getJWTSecret()
  );
};
