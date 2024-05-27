import { object, string, InferType } from "yup";

export const createUserSchema = object({
  username: string().required("username is required"),
  email: string().email("invalid email format").required("email is required"),
  password: string().required("password is required"),
});

export type CreateUserDto = InferType<typeof createUserSchema>;
