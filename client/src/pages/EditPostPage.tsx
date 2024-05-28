import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Textarea, Form } from "../components/form/Form";
import usePosts, { Post } from "../hooks/usePosts";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "../configs/routes";

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { getPost, updatePost } = usePosts();
  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updatePost(id as string, title, content);
    navigate(APP_ROUTES.HOME);
  };

  useEffect(() => {
    (async function () {
      const data = await getPost(id as string);
      setTitle((data as Post)?.title);
      setContent((data as Post)?.content);
    })();

    return () => {
      setTitle("");
      setContent("");
    };
  }, []);

  return (
    <div>
      <h1>Edit Post</h1>
      <Form onSubmit={handleSubmit}>
        <label>Title</label>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={titleOnChange}
          required
        />
        <label>Content</label>
        <Textarea
          name="content"
          value={content}
          onChange={contentOnChange}
          required
        />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default EditPostPage;
