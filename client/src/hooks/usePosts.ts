import { ENDPOINTS } from "../configs/api";
import useApi from "./useApi";
import { useToast } from "./useToast";

export type Post = {
  id: string;
  title: string;
  content: string;
};

type IPostsResponse = {
  status: string;
  data: Post[];
};

type IPostResponse = {
  status: string;
  data: Post;
};

type IPostsCreatePayload = {
  title: string;
  content: string;
};

type IPostsCreateResponse = {
  status: string;
  data: string;
};

export default function usePosts() {
  const { showToastError, showToastSuccess } = useToast();
  const { callGetMethod, callPostMethod, callPutMethod, callDeleteMethod } =
    useApi();

  const getPosts = async () => {
    try {
      const response = await callGetMethod<IPostsResponse>(ENDPOINTS.POSTS);
      return response.data as Post[];
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  const getPost = async (id: string) => {
    try {
      const response = await callGetMethod<IPostResponse>(
        ENDPOINTS.POSTS + "/" + id
      );
      return response.data as Post;
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  const createPost = async (title: string, content: string) => {
    try {
      await callPostMethod<IPostsCreatePayload, IPostsCreateResponse>(
        ENDPOINTS.CREATE_POST,
        { title, content }
      );
      showToastSuccess("Post successfully created.");
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  const updatePost = async (id: string, title?: string, content?: string) => {
    try {
      await callPutMethod<Partial<IPostsCreatePayload>, IPostsCreateResponse>(
        ENDPOINTS.UPDATE_POST + "/" + id,
        { title, content }
      );
      showToastSuccess("Post successfully updated.");
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await callDeleteMethod<any>(ENDPOINTS.POSTS + "/" + id);
      showToastSuccess("Post successfully deleted.");
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  return {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
