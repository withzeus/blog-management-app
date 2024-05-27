import jwt from "jsonwebtoken";
import { getForbiddenErrorResponse, getJWTSecret } from "../helpers";
import { NextFunction, Request, Response } from "express";

export interface IDecode {
  user_id: string;
  iat: number;
  exp: number;
}

export type IRequest = Request & { user: IDecode };

export default function verifyToken(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json(getForbiddenErrorResponse("Token is missing"));
  }

  jwt.verify(token, getJWTSecret(), (err, user: IDecode) => {
    if (err) {
      return res.status(401).json(getForbiddenErrorResponse("Invalid Token"));
    }
    if (!user) {
      return res.status(401).json(getForbiddenErrorResponse("Invalid Token"));
    }
    req.user = user;
    next();
  });
}
