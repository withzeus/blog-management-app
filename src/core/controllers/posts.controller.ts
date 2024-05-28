import { Response } from "express";
import {
  createPostSchema,
  updatePostSchema,
} from "../../internal/schema/posts";
import { IRequest } from "../../internal/middlewares/auth.middleware";
import { SUCCESS_RESPONSES } from "../../internal/responses/success";
import { ERROR_RESPONSES } from "../../internal/responses/error";
import PostService from "../services/posts.service";
import { ValidationError } from "yup";
import {
  getValidationErrorResponse,
  sucessGetResponse,
} from "../../internal/helpers";

class PostsController {
  private postService: typeof PostService;

  constructor() {
    this.postService = PostService;
  }

  async getPosts(_: IRequest, res: Response) {
    try {
      const posts = await this.postService.getPosts();
      res.status(200).json(sucessGetResponse(posts));
    } catch (error) {
      res.status(400).json(ERROR_RESPONSES.ERROR_GET_POSTS);
    }
  }

  async getPost(req: IRequest, res: Response) {
    const { params } = req;
    try {
      const post = await this.postService.getPost(params.id);
      res.status(200).json(sucessGetResponse(post));
    } catch (error) {
      res.status(400).json(ERROR_RESPONSES.ERROR_GET_POST);
    }
  }

  async createPost(req: IRequest, res: Response) {
    const { user } = req;
    try {
      const payload = await createPostSchema.validate(req.body);
      await this.postService.createPost(payload, user.user_id);
      res.status(201).json(SUCCESS_RESPONSES.SUCCESS_CREATE_POST);
    } catch (error) {
      if (error instanceof ValidationError) {
        // If validation error, send a 400 response with the validation error messages
        res.status(400).json(getValidationErrorResponse(error.errors[0]));
      }
      res.status(400).json(ERROR_RESPONSES.ERROR_CREATE_POST);
    }
  }

  async updatePost(req: IRequest, res: Response) {
    const { user, params } = req;
    try {
      const payload = await updatePostSchema.validate(req.body);
      await this.postService.updatePost(payload, params.id, user.user_id);
      res.status(201).json(SUCCESS_RESPONSES.SUCCESS_UPDATE_POST);
    } catch (error) {
      if (error instanceof ValidationError) {
        // If validation error, send a 400 response with the validation error messages
        res.status(400).json(getValidationErrorResponse(error.errors[0]));
      }
      res.status(400).json(ERROR_RESPONSES.ERROR_UPDATE_POST);
    }
  }

  async deletePost(req: IRequest, res: Response) {
    const { params, user } = req;
    try {
      await this.postService.deletePost(params.id, user.user_id);
      res.status(200).json(SUCCESS_RESPONSES.SUCCESS_DELETE_POST);
    } catch (error) {
      res.status(400).json(ERROR_RESPONSES.ERROR_DELETE_POST);
    }
  }
}

export default new PostsController();
