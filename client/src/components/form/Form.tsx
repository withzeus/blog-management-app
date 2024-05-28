import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 8px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 8px;
  font-size: 16px;
  height: 100px;
`;
