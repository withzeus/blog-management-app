import React, { ChangeEvent, useState } from "react";
import { Button, Form, Input } from "../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../configs/routes";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const usernameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await register(username, password, email);
    navigate(APP_ROUTES.HOME);
  };

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <label>Username</label>
        <Input
          type="text"
          name="username"
          onChange={usernameOnChange}
          required
        />
        <label>Password</label>
        <Input
          type="password"
          name="password"
          onChange={passwordOnChange}
          required
        />
        <label>Email</label>
        <Input type="email" name="email" onChange={emailOnChange} required />
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
