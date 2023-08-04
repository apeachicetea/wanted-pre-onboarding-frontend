import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const TodoList = styled.ul``;

const Todo = styled.li``;

const Label = styled.label``;

const Checkbox = styled.input``;

const Text = styled.span``;

const ModifyBtn = styled.button``;

const DeleteBtn = styled.button``;

function Todos() {
  const navigate = useNavigate();
  const baseURL = "https://www.pre-onboarding-selection-task.shop";
  const [todos, setTodos] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const access_token = localStorage.getItem("accessToken");
      setAccessToken(access_token);
    }
    if (accessToken) {
      getTodos();
    }
  }, [accessToken]);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${baseURL}/todos`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { data } = response;
      setTodos(data);
    } catch (error) {
      console.error("Error sending GET request:", error);
    }
  };

  return (
    <Fragment>
      <TodoList>
        {todos.map((todo) => {
          return (
            <Todo id={todo.id}>
              <Label>
                <Checkbox type="checkbox" />
                <Text>{todo.todo}</Text>
              </Label>
              <ModifyBtn data-testid="modify-button">수정</ModifyBtn>
              <DeleteBtn data-testid="delete-button">삭제</DeleteBtn>
            </Todo>
          );
        })}
      </TodoList>
    </Fragment>
  );
}

export default Todos;
