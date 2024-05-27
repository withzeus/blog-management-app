import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../../internal/schema/auth";
import { ERROR_RESPONSES } from "../../internal/responses/error";
import { ValidationError } from "yup";
import { getValidationErrorResponse } from "../../internal/helpers";

class AuthController {
  authService: typeof AuthService;

  constructor(authService: typeof AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const payload = await userLoginSchema.validate(req.body);
      const token = await this.authService.login(payload);
      return res.status(201).json({
        status: "OK",
        token,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        // If validation error, send a 400 response with the validation error messages
        return res
          .status(400)
          .json(getValidationErrorResponse(error.errors[0]));
      }
      return res.status(403).json(ERROR_RESPONSES.ERROR_LOGIN);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const payload = await userRegisterSchema.validate(req.body);
      const token = await this.authService.register(payload);
      return res.status(201).json({
        status: "OK",
        token,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        // If validation error, send a 400 response with the validation error messages
        return res
          .status(400)
          .json(getValidationErrorResponse(error.errors[0]));
      }
      if (error instanceof Error) {
        return res.status(400).json(getValidationErrorResponse(error.message));
      }
    }
  }
}

export default new AuthController(AuthService);
