import PostModel from "../../data/models/posts";
import { createUUID, mapObjectToSqlString } from "../../internal/helpers";
import {
  PostCreateErrorException,
  PostDeleteErrorException,
  PostNotFoundException,
  PostUpdateErrorException,
} from "../../internal/responses/error";
import { CreatePostDto, UpdatePostDto } from "../../internal/schema/posts";

class PostService {
  private model: typeof PostModel;

  constructor() {
    this.model = PostModel;
  }

  async getPosts() {
    const posts = await this.model.findPosts();
    return posts;
  }

  async getPost(id: string) {
    const post = await this.model.findPost(mapObjectToSqlString({ id }));

    if (!post) {
      throw new PostNotFoundException();
    }
    return post;
  }

  async createPost({ title, content }: CreatePostDto, userId: string) {
    const sqlPayload = [createUUID(), userId, title, content];

    const post_id = await this.model.createPost(sqlPayload);

    if (!post_id) {
      throw new PostCreateErrorException();
    }
  }

  async updatePost(payload: UpdatePostDto, id: string, userId: string) {
    const post = await this.model.findPost(mapObjectToSqlString({ id }));

    if (!post) {
      throw new PostNotFoundException();
    }

    if (post.user_id !== userId) {
      throw new PostNotFoundException();
    }

    const post_id = await this.model.updatePost(
      mapObjectToSqlString(payload),
      id,
      userId
    );

    if (!post_id) {
      throw new PostUpdateErrorException();
    }
  }

  async deletePost(id: string, userId: string) {
    const post = await this.model.findPost(mapObjectToSqlString({ id }));

    if (post.user_id !== userId) {
      throw new PostNotFoundException();
    }
    const post_id = await this.model.deletePost([id]);

    if (!post_id) {
      throw new PostDeleteErrorException();
    }
    return post_id;
  }
}

export default new PostService();
