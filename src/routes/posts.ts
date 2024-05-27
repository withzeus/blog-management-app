import express from "express";
import verifyToken from "../internal/middlewares/auth.middleware";
import PostsController from "../core/controllers/posts.controller";

const router = express.Router();

router.use("/posts", verifyToken);

router.get("/posts", PostsController.getPosts.bind(PostsController));
router.get("/posts/:id", PostsController.getPost.bind(PostsController));
router.post("/posts/create", PostsController.createPost.bind(PostsController));
router.delete("/posts/:id", PostsController.deletePost.bind(PostsController));
router.put(
  "/posts/update/:id",
  PostsController.updatePost.bind(PostsController)
);

export default router;
