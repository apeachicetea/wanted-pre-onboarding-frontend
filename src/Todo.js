import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Atodo = styled.li``;

const Label = styled.label``;

const Checkbox = styled.input``;

const Text = styled.span``;

const ModifyBtn = styled.button``;

const DeleteBtn = styled.button``;

function Todo({ todo, todoInput, baseURL, accessToken }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const updateTodo = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/todos/${todo.id}`,
        { todo: todoInput, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${baseURL}/todos/${todo.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error sending DELETE request:", error);
    }
  };

  const handleClick = (e) => {
    console.log(e.target.checked);
    setIsCompleted(e.target.checked);
  };

  return (
    <Atodo>
      <Label>
        <Checkbox
          type="checkbox"
          checked={isCompleted ? true : undefined}
          onClick={handleClick}
        />
        <Text>{todo.todo}</Text>
      </Label>
      <ModifyBtn data-testid="modify-button" onClick={updateTodo}>
        수정
      </ModifyBtn>
      <DeleteBtn data-testid="delete-button" onClick={deleteTodo}>
        삭제
      </DeleteBtn>
    </Atodo>
  );
}

export default Todo;
