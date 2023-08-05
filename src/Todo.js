import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Atodo = styled.li``;

const Label = styled.label``;

const Checkbox = styled.input``;

const Text = styled.span`
  margin: 0px 5px 0px 3px;
`;

const ModifyBtn = styled.button`
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
`;

function Todo({ todo, baseURL, accessToken }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  useEffect(() => {
    updateTodo();
  }, [isCompleted]);

  const updateTodo = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/todos/${todo.id}`,
        { todo: todo.todo, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
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

  const handleChange = (e) => {
    setIsCompleted(e.target.checked);
  };

  return (
    <Atodo>
      <Label>
        <Checkbox
          type="checkbox"
          checked={isCompleted}
          onChange={handleChange}
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
