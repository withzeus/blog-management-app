import React, { ChangeEvent, useState } from "react";
import { Button, Input, Form } from "../components/form/Form";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../configs/routes";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const usernameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(username, password);
    navigate(APP_ROUTES.HOME);
  };

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/register")}>Register</Button>
        <h1>Login</h1>
      </div>
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
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
