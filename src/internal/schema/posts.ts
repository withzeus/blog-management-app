import { object, string, InferType } from "yup";

export const createPostSchema = object({
  title: string()
    .required("title is required")
    .max(255, "title cannot be longer than 255 characters"),
  content: string().required("content is required"),
});

export const updatePostSchema = object({
  title: string().max(255, "title cannot be longer than 255 characters"),
  content: string(),
});

export type CreatePostDto = InferType<typeof createPostSchema>;

export type UpdatePostDto = InferType<typeof updatePostSchema>;
