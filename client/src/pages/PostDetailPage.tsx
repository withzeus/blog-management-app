import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../configs/routes";
import usePosts, { Post } from "../hooks/usePosts";
import { Button } from "../components/form/Form";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>();

  const { getPost, deletePost } = usePosts();

  useEffect(() => {
    (async function () {
      const data = await getPost(id as string);
      setPost(data);
    })();

    return () => {
      setPost(null);
    };
  }, []);

  const handleDelete = async () => {
    await deletePost(id as string);
    navigate("/");
  };

  const handleEdit = () => {
    navigate(APP_ROUTES.EDIT_POSTS + "/" + id);
  };

  if (!post) {
    return <div>Error 404 POST NOT FOUND</div>;
  }

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default PostDetailPage;
