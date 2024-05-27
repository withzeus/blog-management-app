import { object, string, InferType } from "yup";

export const userLoginSchema = object({
  username: string().required("username is required"),
  password: string().required("password is required"),
});

export type UserLoginDto = InferType<typeof userLoginSchema>;

export const userRegisterSchema = object({
  username: string().required("username is required"),
  email: string().email("invalid email format").required("email is required"),
  password: string().required("password is required"),
});

export type UserRegisterDto = InferType<typeof userRegisterSchema>;
