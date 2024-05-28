import React, { ChangeEvent, useState } from "react";
import { Button, Input, Textarea, Form } from "../components/form/Form";
import usePosts from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../configs/routes";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { createPost } = usePosts();
  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createPost(title, content);
    navigate(APP_ROUTES.HOME);
  };

  return (
    <div>
      <h1>Create Post</h1>
      <Form onSubmit={handleSubmit}>
        <label>Title</label>
        <Input type="text" name="title" onChange={titleOnChange} required />
        <label>Content</label>
        <Textarea name="content" onChange={contentOnChange} required />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
};

export default CreatePostPage;
