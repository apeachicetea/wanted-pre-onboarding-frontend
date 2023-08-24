import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Todo from "./Todo";

const TodoList = styled.ul``;

const TodoInput = styled.input``;

const TodoBtn = styled.button`
  margin-left: 5px;
  cursor: pointer;
`;

function Todos() {
  const navigate = useNavigate();
  const baseURL = "https://www.pre-onboarding-selection-task.shop";
  const [todos, setTodos] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
      getTodos(token);
    }
  }, []);

  const getTodos = async (token) => {
    try {
      const response = await axios.get(`${baseURL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setTodos(data);
    } catch (error) {
      console.error("Error sending GET request:", error);
    }
  };

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleClick = () => {
    createTodo();
  };

  const createTodo = async () => {
    try {
      await axios.post(
        `${baseURL}/todos`,
        { todo: todoInput },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      getTodos(accessToken);
      setTodoInput("");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <Fragment>
      <TodoInput
        data-testid="new-todo-input"
        value={todoInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <TodoBtn data-testid="new-todo-add-button" onClick={handleClick}>
        추가
      </TodoBtn>
      <TodoList>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              todoInput={todoInput}
              baseURL={baseURL}
              accessToken={accessToken}
              getTodos={getTodos}
            />
          );
        })}
      </TodoList>
    </Fragment>
  );
}

export default Todos;
